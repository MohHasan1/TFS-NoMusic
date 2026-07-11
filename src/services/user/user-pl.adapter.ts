import "server-only";

import { getPayloadClient } from "#payload-client";
import type { User } from "#payload-types";
import { tryCatchResponse } from "#trycatch-response";

export async function getUserAdapter(id: User["id"]) {
  const payload = await getPayloadClient();

  return tryCatchResponse(() =>
    payload.findByID({
      collection: "users",
      id,
      depth: 0,
    }),
  );
}
