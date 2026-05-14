"use server";

import { forgotPassword } from "@/services/auth/auth.ports";
import { errorResponse, successResponse } from "#responses";
import { logInfo } from "#lib/utils/loggers";
import { ForgotPasswordSchema, TForgotPasswordSchema } from "@/validations/auth/forgot-password";
import { FORGOT_PASSWORD_CLIENT } from "#constants/auth/forgot-password";

export async function forgotPasswordAction(email: TForgotPasswordSchema) {
  const validation = ForgotPasswordSchema.safeParse(email);
  if (!validation.success) {
    return errorResponse([], FORGOT_PASSWORD_CLIENT.VALIDATION_EMAIL_ERROR);
  }

  try {
    const res = await forgotPassword(validation.data.email);
    return successResponse("Magic link sent 🎧");
  } catch (error) {
    return errorResponse([], "Failed to send magic link");
  }
}
