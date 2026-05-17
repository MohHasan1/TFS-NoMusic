"use server";

import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { errorResponse, successResponse } from "#responses";
import { verifyEmail } from "#services/auth/auth.ports";
import { TokenSchema } from "#validations/auth/token";

export async function verifyEmailAction(token: string) {
  // 1. Validate token:
  const validation = TokenSchema.safeParse({ token });
  if (!validation.success) return errorResponse([], VERIFY_EMAIL_CLIENT.VALIDATION_TOKEN_ERROR);

  // 2. Verify email:
  const res = await verifyEmail(validation.data.token);
  if (!res.isSuccess) return errorResponse([], res.message ?? VERIFY_EMAIL_CLIENT.FALLBACK_SERVER_ERROR);

  // Successfull!
  return successResponse(null);

  // NOTE: Redirect is handled in the client.
}
