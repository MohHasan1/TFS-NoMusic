"use server";

import { SigninSchema, TSigninSchema } from "@/validations/auth/schema";
import { signIn } from "@/services/auth/auth-pl.adapter";
import { SIGNIN_CLIENT } from "@/constants/auth/signin";

import { mapZodErrorToErrors } from "#lib/zod/mappers";
import { errorResponse } from "#responses";

import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signinAction(data: TSigninSchema) {
  try {
    const validatedData = await SigninSchema.parseAsync(data);

    // TODO: Distinguish server error from Invalid credentials
    const res = await signIn({ email: validatedData.email, password: validatedData.password });
    if (!res) return errorResponse([], SIGNIN_CLIENT.FALLBACK_ERROR);
    
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = mapZodErrorToErrors(error);
      return errorResponse(fieldError, SIGNIN_CLIENT.FALLBACK_WRONG_CREDENTIALS);
    }
    return errorResponse([], SIGNIN_CLIENT.FALLBACK_SERVER_ERROR);
  }

  redirect("/no-music");
}
