import { TRequest } from "#types/requests";
import { tryCatchResponse } from "#trycatch-response";
import { getPayloadClient } from "@/lib/payload/client";

export async function createRequestAdapter(input: TRequest) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.create({
      collection: "requests",
      data: {
        url: input.url,
        type: input.type,
        name: input.name,
        status: "pending",
        message: input.message,
        metadata: input.metadata,
        email: input.email ?? "pending@request.user",
      },
      select: {},
    }),
  );
}
