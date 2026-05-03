import { isWhitelistedEmail as isWhitelistedEmailFromAdapter } from "@/services/whitelist/whitelist-pl.adapter";

export async function isWhitelistedEmail(email: string) {
  return isWhitelistedEmailFromAdapter(email);
}
