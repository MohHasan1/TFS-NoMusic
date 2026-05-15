"use server";

import { resetPassword } from "@/services/auth/auth.ports";
import { errorResponse, successResponse } from "#responses";
import { TokenSchema } from "@/validations/auth/token";
import { TResetPasswordSchema, ResetPasswordSchema } from "@/validations/auth/reset-password";
import { RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";

export async function resetPasswordAction(data: TResetPasswordSchema, token: string) {
  const tokenValidation = TokenSchema.safeParse({ token });
  if (!tokenValidation.success) {
    return errorResponse([], RESET_PASSWORD_CLIENT.TOKEN_ERROR_DESC);
  }

  const passwordValidation = ResetPasswordSchema.safeParse(data);
  if (!passwordValidation.success) {
    return errorResponse([], RESET_PASSWORD_CLIENT.VALIDATION_RESET_PASS_ERROR);
  }

  try {
    // TODO: finish it up
    await resetPassword(tokenValidation.data.token, passwordValidation.data.password);
    return successResponse("Password reset successfully! 🎧");
  } catch (error: any) {
    return errorResponse([], RESET_PASSWORD_CLIENT.FALLBACK_SERVER_ERROR);
  }
}
