"use server";

import { errorResponse, successResponse } from "#responses";
import { REQUEST_ACCESS_CLIENT } from "@/constants/public/request-access";
import { createRequest } from "@/services/requests/requests.ports";
import { RequestAccessSchema, type TRequestAccessSchema } from "@/validations/public/request-access";

export async function requestAccessAction(data: TRequestAccessSchema) {
  const validation = RequestAccessSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse([], REQUEST_ACCESS_CLIENT.FALLBACK_WRONG_CREDENTIALS);
  }

  const res = await createRequest({
    type: "access_request",
    name: validation.data.name,
    email: validation.data.email,
    message: undefined,
    url: undefined,
    metadata: undefined,
  });
  if (!res.isSuccess) {
    return errorResponse([], res.message ?? REQUEST_ACCESS_CLIENT.FALLBACK_SERVER_ERROR);
  }

  return successResponse(REQUEST_ACCESS_CLIENT.SUCESSFULL_SUBMIT_MSG);
}

export type RequestAccessState = {
  error?: string;
  success?: string;
};
