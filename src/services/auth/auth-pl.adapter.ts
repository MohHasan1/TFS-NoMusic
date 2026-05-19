import "server-only";

import { login, logout } from "@payloadcms/next/auth";
import { headers as getHeaders } from "next/headers";
import { getPayloadClient } from "#payload-client";

import config from "#payload-config";
import type { User } from "#payload-types";
import { errorResponse, successResponse } from "#responses";
import { authLogger } from "#scoped-loggers";
import { tryCatchResponse } from "#trycatch-response";
import type { TSignin, TSignup } from "./auth.types";

export async function signinAdapter(data: TSignin) {
  return tryCatchResponse(() =>
    login({
      collection: "users",
      config,
      email: data.email,
      password: data.password,
    }),
  );
}

export async function signupAdapter(data: TSignup) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.create({
      collection: "users",
      overrideAccess: false,
      select: {},
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }),
  );
}

export async function logoutAdapter() {
  return tryCatchResponse(() =>
    logout({
      allSessions: true,
      config,
    }),
  );
}

export async function verifyEmailAdapter(token: string) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.verifyEmail({
      collection: "users",
      token,
    }),
  );
}

export async function forgotPasswordAdapter(email: string) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.forgotPassword({
      collection: "users",
      data: {
        email: email.toLowerCase(),
      },
    }),
  );
}

export async function resetPasswordAdapter(token: string, password: string) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.resetPassword({
      collection: "users",
      overrideAccess: true,
      data: {
        token,
        password,
      },
    }),
  );
}

export async function getCurrentUserAdapter() {
  const headers = await getHeaders();
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers });

  authLogger(user);

  if (!user) {
    return errorResponse([{ message: "You need to be logged in.", status: 401, code: "UNAUTHORIZED" }], "You need to be logged in.");
  }

  if (user.role === "user") {
    return successResponse(user as User);
  }

  return errorResponse([{ message: "You do not have permission.", status: 403, code: "FORBIDDEN" }], "You do not have permission.");
}
