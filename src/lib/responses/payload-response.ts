/* Maps Payload errors into the app response shape. */

import { TErrorResponse, errorResponse } from "./app-response";
import { APIError } from "payload";

export function payloadErrorResponse(error: unknown): TErrorResponse {
  if (error instanceof APIError) {
    return errorResponse(
      [
        {
          name: error.name,
          message: error.isPublic ? error.message : "Something went wrong.",
          status: error.status,
        },
      ],
      error.isPublic ? error.message : undefined,
    );
  }

  if (error instanceof Error) {
    return errorResponse([
      {
        name: error.name,
        message: "Something went wrong.",
        status: 500,
      },
    ]);
  }

  return errorResponse([
    {
      message: "Something went wrong.",
      status: 500,
    },
  ]);
}
