"use server";

import { resetPassword } from "@/services/auth/auth.ports";
import { errorResponse, successResponse } from "#responses";

export async function resetPasswordAction(token: string, password: string) {
  if (!token) {
    return errorResponse([], "Token is required");
  }
  if (!password) {
    return errorResponse([], "Password is required");
  }

  try {
    await resetPassword(token, password);
    return successResponse("Password reset successfully! 🎧");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to reset password");
  }
}
