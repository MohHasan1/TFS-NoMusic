"use server";

import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { errorResponse, successResponse } from "#responses";
import { verifyEmail } from "@/services/auth/auth.ports";
import { TokenSchema } from "@/validations/auth/token";

export async function verifyEmailAction(token: string) {
  const validation = TokenSchema.safeParse({ token });
  if (!validation.success) {
    return errorResponse([], VERIFY_EMAIL_CLIENT.VALIDATION_TOKEN_ERROR);
  }

  try {
    await verifyEmail(validation.data.token);
    return successResponse(null);
  } catch {
    return errorResponse([], VERIFY_EMAIL_CLIENT.FALLBACK_SERVER_ERROR);
  }

  // NOTE: Redirect is handled in the client.
}
