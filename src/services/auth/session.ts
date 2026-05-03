import { headers as getHeaders } from "next/headers"

import { getPayloadClient } from "@/lib/payload-client"

export async function getCurrentUser() {
  const payload = await getPayloadClient()
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return user ?? null
}
