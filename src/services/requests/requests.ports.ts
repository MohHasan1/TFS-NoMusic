import { TRequest } from "@/types/requests";
import { createRequest as createRequestFromAdapter } from "./requests-pl.adapter";

export async function createRequest(input: TRequest) {
  return createRequestFromAdapter(input);
}
