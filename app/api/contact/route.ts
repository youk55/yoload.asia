import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, token } = body;

    if (!name || !email || !message || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ① Cloudflare Turnstile verification
    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
    formData.append("response", token);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 403 }
      );
    }

    // ② Send to Slack
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhook) {
      console.error("SLACK_WEBHOOK_URL is not set");
      return NextResponse.json(
        { error: "Slack not configured" },
        { status: 500 }
      );
    }

    const slackPayload = {
      text: `📩 *New Website Contact*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:*\n${message}`,
    };

    await fetch(slackWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
