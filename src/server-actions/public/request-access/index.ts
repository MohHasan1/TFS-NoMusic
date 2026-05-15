"use server";

import { errorResponse, successResponse } from "#lib/utils/responses";
import { mapZodErrorToErrors } from "#lib/zod/mappers";
import { REQUEST_ACCESS_CLIENT } from "@/constants/public/request-access";
import { getCurrentUser } from "@/services/auth/auth.ports";
import { createRequest } from "@/services/requests/requests.ports";

import { RequestAccessSchema, TRequestAccessSchema } from "@/validations/public/request-access";
import { ZodError } from "zod";

export async function requestAccessAction(data: TRequestAccessSchema) {
  try {
    const validatedData = RequestAccessSchema.parse(data);

    // TODO: handle errors
    await createRequest({
      type: "access_request",
      name: validatedData.name,
      email: validatedData.email,
      message: undefined,
      url: undefined,
      metadata: undefined,
    });

    return successResponse(REQUEST_ACCESS_CLIENT.SUCESSFULL_SUBMIT_MSG);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = mapZodErrorToErrors(error);
      return errorResponse(fieldError, REQUEST_ACCESS_CLIENT.FALLBACK_WRONG_CREDENTIALS);
    }
    return errorResponse([], REQUEST_ACCESS_CLIENT.FALLBACK_SERVER_ERROR);
  }
}

export type RequestAccessState = {
  error?: string;
  success?: string;
};

export async function submitNoMusicRequestAction(
  _prevState: RequestNoMusicState,
  formData: FormData,
): Promise<RequestNoMusicState> {
  const youtubeURL = getString(formData, "youtubeURL");
  const description = getString(formData, "description");

  if (!youtubeURL) {
    return { error: "YouTube URL is required." };
  }

  if (!isYouTubeURL(youtubeURL)) {
    return { error: "Please enter a valid YouTube URL." };
  }

  const user = await getCurrentUser();
  const email = user?.email?.toLowerCase() ?? "";

  if (!email) {
    return { error: "Signed-in user email is required." };
  }

  try {
    await createRequest({
      type: "nomusic_request",
      name: user?.name ?? "",
      email,
      url: youtubeURL,
      message: description,
      metadata: undefined,
    });

    return { success: "Request submitted. We will review and add it if available." };
  } catch {
    return { error: "Unable to submit song request right now. Please try again." };
  }
}

export type RequestNoMusicState = {
  error?: string;
  success?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isYouTubeURL(value: string) {
  const normalized = value.toLowerCase();
  return normalized.includes("youtube.com/watch") || normalized.includes("youtu.be/");
}
