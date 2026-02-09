import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("BODY:", body)
	console.log("TOKEN:", body.turnstileToken)


    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const message = (body?.message ?? "").toString().trim();
    const turnstileToken = (body?.turnstileToken ?? "").toString().trim();
    const honeypot = (body?.honeypot ?? "").toString().trim();

    // bot honeypot
    if (honeypot) return NextResponse.json({ ok: true });

    // Validate required
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields", detail: { name: !!name, email: !!email, message: !!message } },
        { status: 400 }
      );
    }

    // Turnstile secret required
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Turnstile secret not configured" }, { status: 500 });
    }

    // Verify Turnstile
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData?.success) {
      return NextResponse.json(
        { error: "Verification failed", detail: verifyData },
        { status: 400 }
      );
    }

    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json({ error: "Slack webhook not configured" }, { status: 500 });
    }

    // ✅ Classic incoming webhook needs `text`
    const text =
      `📩 New Website Contact\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message:\n${message}`;

    const slackRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!slackRes.ok) {
      const errText = await slackRes.text().catch(() => "");
      console.error("Slack webhook failed:", slackRes.status, errText);
      return NextResponse.json(
        { error: "Slack notification failed", detail: errText || `HTTP ${slackRes.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
