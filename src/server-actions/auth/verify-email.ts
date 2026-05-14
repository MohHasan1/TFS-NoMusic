"use server";

import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { errorResponse, successResponse } from "#responses";
import { verifyEmail } from "@/services/auth/auth.ports";
import { VerifyEmailSchema } from "@/validations/auth/verify-email";

export async function verifyEmailAction(token: string) {
  if (!token) {
    return errorResponse([], VERIFY_EMAIL_CLIENT.FALLBACK_ERROR);
  }

  const validatedData = await VerifyEmailSchema.parseAsync({ token });

  try {
    await verifyEmail(validatedData.token);
    return successResponse(null);
  } catch {
    return errorResponse([], VERIFY_EMAIL_CLIENT.FALLBACK_ERROR);
  }

  // NOTE: Redirect is handled in the client.
}
