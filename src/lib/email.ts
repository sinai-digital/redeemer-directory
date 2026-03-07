import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const FROM_EMAIL =
  process.env.EMAIL_FROM || "Redeemer Church Directory <noreply@directory.redeemerriverview.org>";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://directory.redeemerriverview.org";
