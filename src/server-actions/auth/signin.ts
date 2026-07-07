"use server";

import { redirect } from "next/navigation";

import { errorResponse } from "#responses";
import { signIn } from "#services/auth/auth.ports";
import { PRIVATE_ROUTES } from "#constants/routes";
import { SIGNIN_CLIENT } from "#constants/auth/signin";
import { QUERY } from "#constants/private/query";
import { TSigninStrictSchema, SigninStrictSchema } from "#validations/auth/signin";

export async function signinAction(data: TSigninStrictSchema) {
  // 1. Validate data:
  const validatedData = SigninStrictSchema.safeParse(data);
  if (!validatedData.success) return errorResponse([], SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);

  // 2. Signin user:
  const res = await signIn(validatedData.data);
  if (!res.isSuccess) return errorResponse([], SIGNIN_CLIENT.FALLBACK_ERROR);

  // 3. Success!
  const prefAudioLang = res.data?.user?.prefAudioLang;
  const params = new URLSearchParams();

  if (prefAudioLang) {
    params.set(QUERY.LANGUAGE, prefAudioLang);
  }

  const query = params.toString();
  const href = query ? `${PRIVATE_ROUTES.NOMUSIC}?${query}` : PRIVATE_ROUTES.NOMUSIC;

  redirect(href);
}
