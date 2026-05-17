import { getPayloadClient } from "@/lib/payload/client";
import { TRequest } from "@/types/requests";

export async function createRequest(input: TRequest) {
  const payload = await getPayloadClient();

  return payload.create({
    collection: "requests",
    data: {
      type: input.type,
      name: input.name,
      email: (input.email ?? "pending@request.local").toLowerCase(),
      url: input.url,
      message: input.message,
      status: "pending",
      metadata: input.metadata,
    },
    select: { email: true },
  });
}
