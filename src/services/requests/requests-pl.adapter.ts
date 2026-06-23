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
        type: input.type,
        status: "pending",
        url: input.url?.trim(),
        name: input.name?.trim(),
        message: input.message?.trim(),
        email: input.email?.trim()?.toLowerCase(),
      },
      select: {},
    }),
  );
}
