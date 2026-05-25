import { TRequest } from "#types/requests";
import { createRequestAdapter } from "./requests-pl.adapter";

export async function createRequest(input: TRequest) {
  return createRequestAdapter(input);
}

export async function createNoMusicRequest(input: TRequest) {
  return createRequestAdapter(input);
}

export async function createAccessRequest(input: TRequest) {
  return createRequestAdapter(input);
}

