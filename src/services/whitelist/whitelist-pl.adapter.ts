import { getPayloadClient } from "#payload-client";
import { errorResponse, successResponse } from "#responses";
import { tryCatchResponse } from "#trycatch-response";

export async function isWhitelistedEmailAdapter(email: string) {
  const payload = await getPayloadClient();

  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "whitelist",
      depth: 0,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
      select: {
        name: true,
      },
    }),
  );
  if (!res.isSuccess) return res;

  const isWhitelisted = res.data.docs.length > 0;
  if (isWhitelisted) return successResponse(isWhitelisted);

  return errorResponse();
}
