import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const recipientEmail = "growframe.agency@gmail.com";
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Growframe Website <onboarding@resend.dev>";

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  niche?: unknown;
  subscriberCount?: unknown;
  message?: unknown;
};

type ContactInquiry = {
  fullName: string;
  email: string;
  niche: string;
  subscriberCount: string;
  message: string;
};

function sanitizeSingleLine(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateInquiry(inquiry: ContactInquiry) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (inquiry.fullName.length < 2) {
    return "Enter your full name.";
  }

  if (!emailPattern.test(inquiry.email)) {
    return "Enter a valid email address.";
  }

  if (inquiry.niche.length < 2) {
    return "Tell us your creator niche.";
  }

  if (inquiry.subscriberCount.length < 1) {
    return "Add your current subscriber count.";
  }

  if (inquiry.message.length < 20) {
    return "Share a little more about your goals.";
  }

  return null;
}

function buildEmailHtml(inquiry: ContactInquiry) {
  const messageHtml = escapeHtml(inquiry.message).replace(/\n/g, "<br />");

  return `
    <div style="margin:0;padding:32px;background:#0A0A0A;color:#F5F5F5;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,0.12);border-radius:16px;background:#111111;padding:32px;">
        <p style="margin:0 0 12px;color:#A78BFA;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;">Growframe Inquiry</p>
        <h1 style="margin:0 0 28px;font-size:28px;line-height:1.2;color:#FFFFFF;">New creator growth inquiry</h1>

        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr>
            <td style="padding:12px 0;color:#A1A1AA;width:170px;">Full name</td>
            <td style="padding:12px 0;color:#FFFFFF;">${escapeHtml(inquiry.fullName)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#A1A1AA;">Email</td>
            <td style="padding:12px 0;color:#FFFFFF;">${escapeHtml(inquiry.email)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#A1A1AA;">Creator niche</td>
            <td style="padding:12px 0;color:#FFFFFF;">${escapeHtml(inquiry.niche)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#A1A1AA;">Subscriber count</td>
            <td style="padding:12px 0;color:#FFFFFF;">${escapeHtml(inquiry.subscriberCount)}</td>
          </tr>
        </table>

        <div style="border-top:1px solid rgba(255,255,255,0.12);padding-top:24px;">
          <p style="margin:0 0 10px;color:#A1A1AA;">Project goals</p>
          <div style="color:#FFFFFF;font-size:16px;line-height:1.7;">${messageHtml}</div>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(inquiry: ContactInquiry) {
  return [
    "New Growframe inquiry",
    "",
    `Full name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Creator niche: ${inquiry.niche}`,
    `Subscriber count: ${inquiry.subscriberCount}`,
    "",
    "Project goals:",
    inquiry.message,
  ].join("\n");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const inquiry: ContactInquiry = {
    fullName: sanitizeSingleLine(body.fullName, 120),
    email: sanitizeSingleLine(body.email, 180).toLowerCase(),
    niche: sanitizeSingleLine(body.niche, 120),
    subscriberCount: sanitizeSingleLine(body.subscriberCount, 80),
    message: sanitizeMessage(body.message, 2000),
  };

  const validationError = validateInquiry(inquiry);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [recipientEmail],
    replyTo: inquiry.email,
    subject: `New Growframe inquiry from ${inquiry.fullName}`,
    html: buildEmailHtml(inquiry),
    text: buildEmailText(inquiry),
  });

  if (error) {
    console.error("Resend contact error:", error);
    return NextResponse.json(
      { error: "Unable to send your inquiry right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
