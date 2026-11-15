"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const CONTACT_TO_EMAIL = "ronan@cogar.ie";
const BLOCKED_EMAIL_DOMAINS = ["busylittlepixels.com"];
const TURNSTILE_ACTION = "contact";
const GENERIC_ERROR = "generic";

export type ContactError =
  | "nameRequired"
  | "emailInvalid"
  | "emailBlocked"
  | "messageTooShort"
  | "consentRequired"
  | "verificationFailed"
  | typeof GENERIC_ERROR;

export type ContactState = {
  success: boolean;
  errors?: ContactError[];
  values?: { name: string; email: string; message: string };
};

function isBlockedEmail(email: string) {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  return BLOCKED_EMAIL_DOMAINS.some(
    (blocked) => domain === blocked || domain.endsWith(`.${blocked}`),
  );
}

async function verifyTurnstile(
  secret: string,
  token: string,
  hostnames: Set<string>,
) {
  if (token.length > 2048) return false;

  const ip = (await headers()).get("cf-connecting-ip");
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    },
  );
  if (!res.ok) throw new Error(`siteverify ${res.status}`);

  const result = (await res.json()) as {
    success: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  const valid =
    result.success &&
    result.action === TURNSTILE_ACTION &&
    hostnames.has(result.hostname ?? "");
  if (!valid) {
    console.warn("Turnstile rejected submission:", {
      errors: result["error-codes"],
      action: result.action,
      hostname: result.hostname,
    });
  }
  return valid;
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: humans never see this field, so pretend success to bots.
  if (formData.get("website")) return { success: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const acceptTerms = formData.get("acceptTerms");
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const values = { name, email, message };

  const errors: ContactError[] = [];
  if (!name) errors.push("nameRequired");
  if (!email.includes("@")) errors.push("emailInvalid");
  else if (isBlockedEmail(email)) errors.push("emailBlocked");
  if (message.length < 10) errors.push("messageTooShort");
  if (!acceptTerms) errors.push("consentRequired");
  if (!token) errors.push("verificationFailed");
  if (errors.length > 0) return { success: false, errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET;
  const turnstileHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );
  if (!apiKey || !turnstileSecret || turnstileHostnames.size === 0) {
    console.error(
      "RESEND_API_KEY, TURNSTILE_SECRET or TURNSTILE_HOSTNAMES is not set",
    );
    return { success: false, errors: [GENERIC_ERROR], values };
  }

  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    if (!(await verifyTurnstile(turnstileSecret, token, turnstileHostnames))) {
      return { success: false, errors: ["verificationFailed"], values };
    }

    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Busy Little Pixels <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, errors: [GENERIC_ERROR], values };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, errors: [GENERIC_ERROR], values };
  }
}
