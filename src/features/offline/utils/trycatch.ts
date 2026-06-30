import { tryCatchResponse } from "#trycatch-response";
import { defaultErrorResponse } from "@/lib/responses/default-response";
import { TResponse } from "@/lib/responses/app-response";

export function offlineTryCatch<T>(fn: () => Promise<T>): Promise<TResponse<T>> {
  return tryCatchResponse(fn, defaultErrorResponse);
}
