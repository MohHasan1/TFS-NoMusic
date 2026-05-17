"use server";

import { redirect } from "next/navigation";

import { errorResponse } from "#responses";
import { PUBLIC_ROUTES } from "#constants/routes";
import { signUp } from "#services/auth/auth.ports";
import { SIGNUP_CLIENT } from "@/constants/auth/signup";
import { TSignupSchema, SignupSchema } from "#validations/auth/signup";
import { isWhitelistedEmail } from "#services/whitelist/whitelist.ports";

export async function signupAction(data: TSignupSchema) {
  // 1. Validate data:
  const validation = SignupSchema.safeParse(data);
  if (!validation.success) return errorResponse([], SIGNUP_CLIENT.FALLBACK_WRONG_CREDENTIALS);

  // 2. Check whitelist:
  const whitelistRes = await isWhitelistedEmail(validation.data.email);
  if (!whitelistRes.isSuccess) return errorResponse([], SIGNUP_CLIENT.EMAIL_NOT_IN_WHITELIST);

  // 3. Signup user:
  const res = await signUp({
    name: validation.data.name,
    email: validation.data.email,
    password: validation.data.password,
  });
  if (!res.isSuccess) return errorResponse([], res.message ?? SIGNUP_CLIENT.FALLBACK_SERVER_ERROR);

  // Successfull!
  redirect(PUBLIC_ROUTES.CHECK_EMAIL);
}
