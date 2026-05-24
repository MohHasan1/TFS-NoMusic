"use server";

import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";
import { errorResponse, successResponse } from "#responses";
import { getCurrentUser } from "#services/auth/auth.ports";
import { createNoMusicRequest } from "#services/requests/requests.ports";
import { RequestNoMusicSchema, type TRequestNoMusicSchema } from "#validations/private/request-nomusic";

export async function submitNoMusicRequestAction(data: TRequestNoMusicSchema) {
  const validation = RequestNoMusicSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse([], REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR);
  }

  const userResponse = await getCurrentUser();
  if (!userResponse.isSuccess) {
    return errorResponse(userResponse.errors, userResponse.message);
  }

  const res = await createNoMusicRequest({
    user: userResponse.data,
    youtubeURL: validation.data.youtubeURL,
  });
  if (!res.isSuccess) {
    return errorResponse([], res.message ?? REQUEST_NOMUSIC_CLIENT.FALLBACK_SERVER_ERROR);
  }

  return successResponse(true, REQUEST_NOMUSIC_CLIENT.SUCCESS_SUBMIT_MSG);
}
