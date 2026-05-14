"use server";

import { TSigninStrictSchema, SigninStrictSchema } from "@/validations/auth/signin";
import { signIn } from "@/services/auth/auth-pl.adapter";
import { SIGNIN_CLIENT } from "@/constants/auth/signin";

import { mapZodErrorToErrors } from "#lib/zod/mappers";
import { errorResponse } from "#responses";

import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { PRIVATE_ROUTES } from "#constants/routes";

export async function signinAction(data: TSigninStrictSchema) {
  try {
    const validatedData = await SigninStrictSchema.parseAsync(data);

    // TODO: Distinguish server error from Invalid credentials
    const res = await signIn({ email: validatedData.email, password: validatedData.password });
    if (!res) return errorResponse([], SIGNIN_CLIENT.FALLBACK_ERROR); // TODO: the correct error message
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = mapZodErrorToErrors(error);
      return errorResponse(fieldError, SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);
    }
    return errorResponse([], SIGNIN_CLIENT.FALLBACK_SERVER_ERROR);
  }

  redirect(PRIVATE_ROUTES.NOMUSIC);
}
