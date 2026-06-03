"use server";

import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { getPayloadClient } from "#payload-client";
import { errorResponse, successResponse } from "#responses";
import { verifyEmail } from "#services/auth/auth.ports";
import { tryCatchResponse } from "#trycatch-response";
import { TokenSchema } from "#validations/auth/token";
import { EMAIL_ACTION } from "@/collections/constants/emails";

export async function verifyEmailAction(token: string, userId?: string | null) {
  // 1. Validate token:
  const validation = TokenSchema.safeParse({ token });
  if (!validation.success) return errorResponse([], VERIFY_EMAIL_CLIENT.VALIDATION_TOKEN_ERROR);

  // 2. Verify email:
  const res = await verifyEmail(validation.data.token);
  if (!res.isSuccess)
    return errorResponse([], res.message ?? VERIFY_EMAIL_CLIENT.FALLBACK_SERVER_ERROR);

  // 3. Trigger normal user update, so welcome hook runs - TODO: move to service
  if (userId) {
    const payload = await getPayloadClient();

    await tryCatchResponse(() =>
      payload.update({
        collection: "users",
        id: userId,
        overrideAccess: true,
        data: {
          emailAction: EMAIL_ACTION.SEND,
        },
      }),
    );
  }

  // Successfull!
  return successResponse(null);

  // NOTE: Redirect is handled in the client.
}
