"use server";

import {
  RequestNoMusicSchema,
  type TRequestNoMusicSchema,
} from "#validations/private/request-nomusic";
import { getCurrentUser } from "#services/auth/auth.ports";
import { errorResponse, successResponse } from "#responses";
import { createNoMusicRequest } from "#services/requests/requests.ports";
import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";

export async function submitNoMusicRequestAction(data: TRequestNoMusicSchema) {
  const validation = RequestNoMusicSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse([], REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR);
  }

  const userRes = await getCurrentUser();
  if (!userRes.isSuccess) {
    return errorResponse(userRes.errors, userRes.message);
  }

  const res = await createNoMusicRequest({
    url: data.url,
    name: userRes.data.name,
    email: userRes.data.email,
    type: "nomusic_request",
  });
  if (!res.isSuccess) {
    return errorResponse([], res.message ?? REQUEST_NOMUSIC_CLIENT.FALLBACK_SERVER_ERROR);
  }

  return successResponse(null, REQUEST_NOMUSIC_CLIENT.SUCCESS_SUBMIT_MSG);
}
