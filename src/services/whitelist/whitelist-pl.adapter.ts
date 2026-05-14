import { getPayloadClient } from "@/lib/payload/payload-client";

export async function isWhitelistedEmail(email: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "whitelist",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: email.toLowerCase(),
      },
    },
  });

  return result.docs.length > 0;
}
