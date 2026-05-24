import type { TRequest } from "@/types/requests";
import type { TNoMusicRequest } from "./requests.types";
import { createRequest as createRequestFromAdapter } from "./requests-pl.adapter";

export async function createRequest(input: TRequest) {
  return createRequestFromAdapter(input);
}

export async function createNoMusicRequest(input: TNoMusicRequest) {
  return createRequestFromAdapter({
    type: "nomusic_request",
    name: input.user.name ?? "",
    email: input.user.email.toLowerCase(),
    url: input.youtubeURL,
    message: undefined,
    metadata: undefined,
  });
}
