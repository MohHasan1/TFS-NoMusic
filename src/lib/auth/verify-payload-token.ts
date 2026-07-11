import "server-only";

import { createHash } from "node:crypto";
import { type JWTPayload, jwtVerify } from "jose";

const rawSecret = process.env.PAYLOAD_SECRET;
if (!rawSecret) {
  throw new Error("PAYLOAD_SECRET is not configured.");
}

// Payload hashes the configured secret before signing authentication JWTs.
const processedSecret = createHash("sha256").update(rawSecret).digest("hex").slice(0, 32);
const secretKey = new TextEncoder().encode(processedSecret);

export async function verifyPayloadToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}
