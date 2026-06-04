import { TRequest } from "#types/requests";
import { tryCatchResponse } from "#trycatch-response";
import { getPayloadClient } from "@/lib/payload/client";

export async function createRequestAdapter(input: TRequest) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.create({
      collection: "requests",
      overrideAccess: true,
      data: {
        url: input.url?.trim(),
        type: input.type,
        name: input.name?.trim(),
        status: "pending",
        message: input.message,
        email: input.email?.trim()?.toLowerCase(),
      },
      select: {},
    }),
  );
}
