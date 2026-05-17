/* Shared app response types and helper factories. */

/// _____ Type ____ ///
export type TError = { name?: string; message: string; status?: number; code?: string };

export type TSuccessResonse<T> = {
  isSuccess: true;
  data: T;
  message?: string;
};

export type TErrorResponse = {
  isSuccess: false;
  message: string;
  errors: TError[];
};

/// _____ Discriminated union pattern ____ ///
export type TResponse<T> = TSuccessResonse<T> | TErrorResponse;

/// _____ helpers ____ ///
export function successResponse<T>(data: T, message = "Success"): TSuccessResonse<T> {
  return {
    isSuccess: true,
    data,
    message,
  };
}

export function errorResponse(errors: TError[] = [], message = "Error"): TErrorResponse {
  return {
    isSuccess: false,
    errors,
    message,
  };
}

// export type TResponse<D = unknown> = {
//   isSuccess: boolean;
//   message: string;
//   data: D;
//   error: TError[];
// };
