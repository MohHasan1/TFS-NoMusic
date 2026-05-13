import config from "@/payload.config";
import { login, logout } from "@payloadcms/next/auth";
import { headers as getHeaders } from "next/headers";

import { getPayloadClient } from "@/lib/payload/payload-client";
import type { SignInDTO, SignUpDTO } from "@/services/auth/dto";

export async function signIn(input: SignInDTO) {
  return login({
    collection: "users",
    config,
    email: input.email,
    password: input.password,
  });
}

export async function signUp(input: SignUpDTO) {
  const payload = await getPayloadClient();

  return payload.create({
    collection: "users",
    data: {
      email: input.email.toLowerCase(),
      password: input.password,
      fullName: input.fullName,
    },
  });
}

export async function logoutUser() {
  return logout({
    allSessions: true,
    config,
  });
}

export async function getCurrentUser() {
  const payload = await getPayloadClient();
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  return user ?? null;
}
export async function verifyEmail(token: string) {
  const payload = await getPayloadClient();

  return payload.verifyEmail({
    collection: "users",
    token,
  });
}
