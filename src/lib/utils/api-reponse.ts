import { errorResponse, successResponse, type TError } from "./responses";

export function successApiResponse<T>(data: T, message = "Success", status = 200): Response {
  const body = successResponse(data, message);

  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorApiResponse(error: TError[] = [], status = 400, message = "Error"): Response {
  const body = errorResponse(error, message);

  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
