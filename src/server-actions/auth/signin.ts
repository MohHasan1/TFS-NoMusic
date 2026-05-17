"use server";

import { redirect } from "next/navigation";

import { errorResponse } from "#responses";
import { signIn } from "#services/auth/auth.ports";
import { PRIVATE_ROUTES } from "#constants/routes";
import { SIGNIN_CLIENT } from "#constants/auth/signin";
import { TSigninStrictSchema, SigninStrictSchema } from "#validations/auth/signin";

export async function signinAction(data: TSigninStrictSchema) {
  // 1. Validate data:
  const validatedData = SigninStrictSchema.safeParse(data);
  if (!validatedData.success) return errorResponse([], SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);

  // 2. Signin user:
  const res = await signIn(validatedData.data);
  if (!res.isSuccess) return errorResponse([], res.message ?? SIGNIN_CLIENT.FALLBACK_ERROR);

  // Successfull!
  redirect(PRIVATE_ROUTES.NOMUSIC);
}
