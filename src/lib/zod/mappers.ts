import { ZodError } from "zod";

export function mapZodErrorToErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    name: issue.path.join(".") || undefined,
    message: issue.message,
  }));
}
