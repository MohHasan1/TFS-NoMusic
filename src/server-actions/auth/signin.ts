"use server";

import { TSigninStrictSchema, SigninStrictSchema } from "@/validations/auth/signin";
import { signIn } from "@/services/auth/auth-pl.adapter";
import { SIGNIN_CLIENT } from "@/constants/auth/signin";

import { errorResponse } from "#responses";

import { redirect } from "next/navigation";
import { PRIVATE_ROUTES } from "#constants/routes";

export async function signinAction(data: TSigninStrictSchema) {
  try {
    const validatedData = SigninStrictSchema.safeParse(data);
    if (!validatedData.success) return errorResponse([], SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);

    // TODO: Distinguish server error from Invalid credentials
    const res = await signIn(validatedData.data);
    if (!res) return errorResponse([], SIGNIN_CLIENT.FALLBACK_ERROR); // TODO: the correct error message
  } catch (error) {
    return errorResponse([], SIGNIN_CLIENT.FALLBACK_SERVER_ERROR);
  }

  redirect(PRIVATE_ROUTES.NOMUSIC);
}
