import config from "@payload-config"
import { login, logout } from "@payloadcms/next/auth"

import { getPayloadClient } from "@/lib/payload-client"

export async function signInWithPayload(input: {
  email: string
  password: string
}) {
  return login({
    collection: "users",
    config,
    email: input.email,
    password: input.password,
  })
}

export async function isWhitelistedEmail(email: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: "whitelist",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: email.toLowerCase(),
      },
    },
  })

  return result.docs.length > 0
}

export async function signUpWithPayload(input: {
  email: string
  password: string
  fullName: string
}) {
  const payload = await getPayloadClient()

  return payload.create({
    collection: "users",
    data: {
      email: input.email.toLowerCase(),
      password: input.password,
      fullName: input.fullName,
    },
  })
}

export async function logoutWithPayload() {
  return logout({
    allSessions: true,
    config,
  })
}
