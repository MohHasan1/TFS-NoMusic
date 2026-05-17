/* Wraps async calls and normalizes success and error responses. */

import { payloadErrorResponse } from "#payload-response";
import { successResponse, type TErrorResponse, type TResponse } from "./app-response";
// import { defaultErrorResponse } from "./default-response";

const fallbackHandler = payloadErrorResponse;

export async function tryCatchResponse<T>(
  fn: () => Promise<T>,
  errorHandler: (error: unknown) => TErrorResponse = fallbackHandler,
): Promise<TResponse<T>> {
  try {
    const data = await fn();

    return successResponse(data);
  } catch (error) {
    return errorHandler(error);
  }
}
