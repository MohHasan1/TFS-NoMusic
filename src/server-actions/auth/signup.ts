"use server";

import { PUBLIC_ROUTES } from "#constants/routes";
import { errorResponse } from "#responses";

import { SIGNUP_CLIENT } from "@/constants/auth/signup";
import { signUp } from "@/services/auth/auth-pl.adapter";
import { isWhitelistedEmail } from "@/services/whitelist/whitelist-pl.adapter";
import { SignupSchema, TSignupSchema } from "@/validations/auth/signup";
import { redirect } from "next/navigation";

export async function signupAction(data: TSignupSchema) {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse([], SIGNUP_CLIENT.FALLBACK_WRONG_CREDENTIALS);
  }

  try {
    const allowed = await isWhitelistedEmail(validation.data.email);
    if (!allowed) return errorResponse([], SIGNUP_CLIENT.EMAIL_NOT_IN_WHITELIST);

    // TODO: show correct error message: e.g. email already in use
    const res = await signUp({
      name: validation.data.name,
      email: validation.data.email,
      password: validation.data.password,
    });
    if (res) return errorResponse([], SIGNUP_CLIENT.FALLBACK_SERVER_ERROR);
  } catch (error) {
    return errorResponse([], SIGNUP_CLIENT.FALLBACK_SERVER_ERROR);
  }

  redirect(PUBLIC_ROUTES.CHECK_EMAIL);
}
