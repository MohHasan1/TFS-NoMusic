import { getPayloadClient } from "#payload-client";
import { tryCatchResponse } from "#trycatch-response";
import { errorResponse, successResponse } from "#responses";

export async function isWhitelistedEmailAdapter(email: string) {
  const payload = await getPayloadClient();

  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "whitelist",
      depth: 0,
      limit: 1,
      pagination: false,
      overrideAccess: true, // bypassing access check as read is set to admins only.
      where: {
        email: {
          equals: email.trim().toLowerCase(),
        },
      },
      select: {},
    }),
  );
  if (!res.isSuccess) return res;

  const isWhitelisted = res.data.docs.length > 0;
  if (isWhitelisted) return successResponse(isWhitelisted);

  return errorResponse([], "User is not whitelisted");
}
