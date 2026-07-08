"use server";

import { redirect } from "next/navigation";

import { SIGNIN_CLIENT } from "#constants/auth/signin";
import { QUERY } from "#constants/private/query";
import { PRIVATE_ROUTES } from "#constants/routes";
import { errorResponse } from "#responses";
import { signIn } from "#services/auth/auth.ports";
import { SigninStrictSchema, type TSigninStrictSchema } from "#validations/auth/signin";

const SIGN_IN_PATH = "/signin";

export async function signinAction(data: TSigninStrictSchema, redirectTo?: string) {
  // 1. Validate data:
  const validatedData = SigninStrictSchema.safeParse(data);
  if (!validatedData.success) return errorResponse([], SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);

  // 2. Signin user:
  const res = await signIn(validatedData.data);
  if (!res.isSuccess) return errorResponse([], SIGNIN_CLIENT.FALLBACK_ERROR);

  // 3. Success!
  const safeRedirect = getSafeRedirectPath(redirectTo);
  if (safeRedirect) {
    redirect(safeRedirect);
  }

  const prefAudioLang = res.data?.user?.prefAudioLang;
  const params = new URLSearchParams();

  if (prefAudioLang) {
    params.set(QUERY.LANGUAGE, prefAudioLang);
  }

  const query = params.toString();
  const href = query ? `${PRIVATE_ROUTES.NOMUSIC}?${query}` : PRIVATE_ROUTES.NOMUSIC;

  redirect(href);
}

function getSafeRedirectPath(redirectTo?: string) {
  if (!redirectTo) return null;
  if (!redirectTo.startsWith("/")) return null;
  if (redirectTo.startsWith("//")) return null;
  if (redirectTo.startsWith(SIGN_IN_PATH)) return null;

  return redirectTo;
}
