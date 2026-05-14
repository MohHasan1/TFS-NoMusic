"use server";

import { forgotPassword } from "@/services/auth/auth.ports";
import { errorResponse, successResponse } from "#responses";
import { logInfo } from "#lib/utils/loggers";

export async function forgotPasswordAction(email: string) {
  if (!email) {
    return errorResponse([], "Email is required");
  }

  try {
    const res = await forgotPassword(email);
    logInfo(res)
    return successResponse("Magic link sent 🎧");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to send magic link");
  }
}
