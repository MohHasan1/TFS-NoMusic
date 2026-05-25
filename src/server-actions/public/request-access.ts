"use server";

import { errorResponse, successResponse } from "#responses";
import { createAccessRequest } from "#services/requests/requests.ports";
import { REQUEST_ACCESS_CLIENT } from "#constants/public/request-access";
import { RequestAccessSchema, type TRequestAccessSchema } from "#validations/public/request-access";

// TODO: add form security, check if the email is already asked for accessed, rate limit, client stop
export async function requestAccessAction(data: TRequestAccessSchema) {
  const validation = RequestAccessSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse([], REQUEST_ACCESS_CLIENT.FALLBACK_INVALID_REQUEST);
  }

  const res = await createAccessRequest({
    type: "access_request",
    name: validation.data.name,
    email: validation.data.email,
  });
  if (!res.isSuccess) {
    return errorResponse([], res.message ?? REQUEST_ACCESS_CLIENT.FALLBACK_SERVER_ERROR);
  }

  return successResponse(null, REQUEST_ACCESS_CLIENT.SUCCESS_SUBMIT_MSG);
}
