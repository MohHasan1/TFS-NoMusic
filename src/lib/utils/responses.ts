/// _____ Type ____ ///
export type TError = { name?: string; message: string };

export type Response<D = unknown> = {
  isSuccess: boolean;
  message: string;
  data: D;
  error: TError[];
};

/// _____ helpers ____ ///
export function successResponse<T>(data: T, message = "Success"): Response<T> {
  return {
    isSuccess: true,
    data,
    message,
    error: [],
  };
}

export function errorResponse(error: TError[] = [], message = "Error"): Response<null> {
  return {
    isSuccess: false,
    error,
    message,
    data: null,
  };
}
