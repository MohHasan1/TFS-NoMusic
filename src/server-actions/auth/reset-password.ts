"use server";

import { RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { errorResponse, successResponse } from "#responses";
import { resetPassword } from "#services/auth/auth.ports";
import { ResetPasswordSchema, type TResetPasswordSchema } from "#validations/auth/reset-password";
import { TokenSchema } from "#validations/auth/token";

export async function resetPasswordAction(data: TResetPasswordSchema, token: string) {
  // 1. Validate token:
  const tokenValidation = TokenSchema.safeParse({ token });
  if (!tokenValidation.success) return errorResponse([], RESET_PASSWORD_CLIENT.TOKEN_ERROR_DESC);

  // 2. Validate password:
  const passwordValidation = ResetPasswordSchema.safeParse(data);
  if (!passwordValidation.success)
    return errorResponse([], RESET_PASSWORD_CLIENT.VALIDATION_RESET_PASS_ERROR);

  // 3. Reset password:
  const res = await resetPassword(tokenValidation.data.token, passwordValidation.data.password);
  if (!res.isSuccess)
    return errorResponse([], res.message ?? RESET_PASSWORD_CLIENT.FALLBACK_SERVER_ERROR);

  // Successfull!
  return successResponse(null);
}
