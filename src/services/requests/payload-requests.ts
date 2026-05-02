import { getPayloadClient } from "@/lib/payload-client"

export async function createRequest(input: {
  type: "access_request" | "music_request" | "general_feedback" | "bug_report"
  email: string
  message?: string
  metadata?: Record<string, unknown>
}) {
  const payload = await getPayloadClient()

  return payload.create({
    collection: "requests",
    data: {
      type: input.type,
      email: input.email.toLowerCase(),
      message: input.message,
      status: "pending",
      metadata: input.metadata,
    },
  })
}
