import { getPayloadClient } from "@/lib/payload-client";
import { CreateRequestDTO } from "./dto";

export async function createRequest(input: CreateRequestDTO) {
  const payload = await getPayloadClient();

  return payload.create({
    collection: "requests",
    data: {
      type: input.type,
      email: input.email.toLowerCase(),
      message: input.message,
      status: "pending",
      metadata: input.metadata,
    },
  });
}
