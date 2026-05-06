import { requireEnv } from "@/lib/env";

export function requireResendEnv() {
  return {
    apiKey: requireEnv("RESEND_API_KEY"),
    fromAddress: process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev",
    fromName: process.env.RESEND_FROM_NAME || "The Family Suite",
  };
}
