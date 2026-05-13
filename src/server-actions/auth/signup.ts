"use server";

import { PUBLIC_ROUTES } from "#constants/routes";
import { errorResponse } from "#lib/utils/responses";
import { mapZodErrorToErrors } from "#lib/zod/mappers";
import { SIGNUP_CLIENT } from "@/constants/auth/signup";
import { signUp } from "@/services/auth/auth-pl.adapter";
import { isWhitelistedEmail } from "@/services/whitelist/whitelist-pl.adapter";
import { SignupSchema, TSignupSchema } from "@/validations/auth/signup";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signupAction(data: TSignupSchema) {
  try {
    const validatedData = await SignupSchema.parseAsync(data);

    const allowed = await isWhitelistedEmail(validatedData.email);
    if (!allowed) return errorResponse([], SIGNUP_CLIENT.EMAIL_NOT_IN_WHITELIST);

    const res = await signUp({
      fullName: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });
    if (!res) return errorResponse([], SIGNUP_CLIENT.FALLBACK_ERROR);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = mapZodErrorToErrors(error);
      return errorResponse(fieldError, SIGNUP_CLIENT.FALLBACK_WRONG_CREDENTIALS);
    }
    return errorResponse([], SIGNUP_CLIENT.FALLBACK_SERVER_ERROR);
  }

  redirect(PUBLIC_ROUTES.CHECK_EMAIL);
}
