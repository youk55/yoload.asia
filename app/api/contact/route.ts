import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Simple in-memory rate limiter (per-IP buckets). For production, use Redis.
type RateEntry = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateEntry>();
const WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 2; // requests per minute per IP

function getIp(req: Request): string {
  const headers = new Headers(req.headers);
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xr = headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}

function checkRateLimit(ip: string) {
  const limit = Number.parseInt(process.env.CONTACT_RATE_LIMIT_PER_MIN ?? "") || DEFAULT_LIMIT;
  const now = Date.now();
  const e = rateBuckets.get(ip);
  if (!e || now >= e.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: limit - 1, resetAt: now + WINDOW_MS };
  }
  if (e.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: e.resetAt };
  }
  e.count += 1;
  return { allowed: true, remaining: Math.max(0, limit - e.count), resetAt: e.resetAt };
}

export const runtime = "nodejs";

const BodySchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
  message: z.string().trim().min(1, "Message is required."),
  // Internal anti-spam fields
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // Rate limit by IP
  const ip = getIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return new NextResponse(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
      status: 429,
      headers: {
        "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
        "Content-Type": "application/json",
      },
    });
  }
  let payload: z.infer<typeof BodySchema>;
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!(key in errors)) errors[key] = issue.message;
      }
      return NextResponse.json({ errors }, { status: 400 });
    }
    payload = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  const errors: Record<string, string> = {};
  // Honeypot check: if filled, silently accept without sending (avoid tipping off bots)
  if ((payload.honeypot || "").trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Verify Cloudflare Turnstile
  const token = (payload.turnstileToken || "").trim();
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!token) errors.turnstile = "Verification required.";
  if (!secret) {
    // Treat missing secret as server misconfig
    return NextResponse.json({ error: "Turnstile is not configured." }, { status: 500 });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`,
    });
    const verifyJson = (await verifyRes.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!verifyJson?.success) {
      return NextResponse.json({ error: "Verification failed.", codes: verifyJson?.["error-codes"] }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Verification service error." }, { status: 502 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";
  const to = "info@yoload.asia";

  const subject = `New contact form submission — Yoload`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 8px;">New message from yoload.asia</h2>
      <p style="margin:0 0 12px;">You have received a new contact form submission.</p>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 8px;color:#555;">Name</td><td style="padding:4px 8px;"><strong>${escapeHtml(
          name
        )}</strong></td></tr>
        <tr><td style="padding:4px 8px;color:#555;">Email</td><td style="padding:4px 8px;">${escapeHtml(
          email
        )}</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;background:#fafafa;white-space:pre-wrap;">${escapeHtml(
        message
      )}</div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: email,
    });

    if (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
