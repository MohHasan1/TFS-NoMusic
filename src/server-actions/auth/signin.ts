"use server";

import { mapZodErrorToErrors } from "#lib/zod/mappers";

import { logInfo } from "#loggers";
import { errorResponse } from "#responses";
import { signIn } from "@/services/auth/auth-pl.adapter";
import { SigninSchema, TSigninSchema } from "@/validations/auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signinAction(data: TSigninSchema) {
  try {
    const validatedData = await SigninSchema.parseAsync(data);

    // TODO: Distinguish server error from Invalid credentials
    const res = await signIn({ email: validatedData.email, password: validatedData.password });
    if (!res) return errorResponse([], "Invalid credentials. Please try again.");
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = mapZodErrorToErrors(error);
      return errorResponse(fieldError, "Invalid credentials. Please try again.");
    }
    logInfo(error);
    return errorResponse(
      [],
      "Something went wrong. Please try again later - Please try again later sir okay, thank you sir.",
    );
  }

  redirect("/no-music");
}
