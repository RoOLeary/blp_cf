"use server";

import { Resend } from "resend";

const CONTACT_TO_EMAIL = "ronan@cogar.ie";
const GENERIC_ERROR = "generic";

export type ContactError =
  | "nameRequired"
  | "emailInvalid"
  | "messageTooShort"
  | "consentRequired"
  | typeof GENERIC_ERROR;

export type ContactState = {
  success: boolean;
  errors?: ContactError[];
  values?: { name: string; email: string; message: string };
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const acceptTerms = formData.get("acceptTerms");
  const values = { name, email, message };

  const errors: ContactError[] = [];
  if (!name) errors.push("nameRequired");
  if (!email.includes("@")) errors.push("emailInvalid");
  if (message.length < 10) errors.push("messageTooShort");
  if (!acceptTerms) errors.push("consentRequired");
  if (errors.length > 0) return { success: false, errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, errors: [GENERIC_ERROR], values };
  }

  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
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
