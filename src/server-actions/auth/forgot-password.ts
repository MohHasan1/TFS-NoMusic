"use server";

import { FORGOT_PASSWORD_CLIENT } from "#constants/auth/forgot-password";
import { errorResponse, successResponse } from "#responses";
import { forgotPassword } from "#services/auth/auth.ports";
import { ForgotPasswordSchema, type TForgotPasswordSchema } from "#validations/auth/forgot-password";

export async function forgotPasswordAction(email: TForgotPasswordSchema) {
  // 1. Validate data:
  const validation = ForgotPasswordSchema.safeParse(email);
  if (!validation.success) return errorResponse([], FORGOT_PASSWORD_CLIENT.VALIDATION_EMAIL_ERROR);

  // 2. Send reset email:
  const res = await forgotPassword(validation.data.email);
  if (!res.isSuccess) return errorResponse([], res.message ?? FORGOT_PASSWORD_CLIENT.FALLBACK_SERVER_ERROR);

  // Successfull!
  return successResponse("Magic link sent 🎧");
}
