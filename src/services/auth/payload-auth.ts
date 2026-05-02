import { getPayloadClient } from "@/lib/payload-client"

export async function signInWithPayload(input: {
  email: string
  password: string
}) {
  const payload = await getPayloadClient()

  return payload.login({
    collection: "users",
    data: {
      email: input.email,
      password: input.password,
    },
  })
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
      email: input.email,
      password: input.password,
      fullName: input.fullName,
    },
  })
}
