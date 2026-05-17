import { isWhitelistedEmailAdapter } from "./whitelist-pl.adapter";

export async function isWhitelistedEmail(email: string) {
  return isWhitelistedEmailAdapter(email);
}
