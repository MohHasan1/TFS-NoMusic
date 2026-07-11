import type { User } from "#payload-types";
import { getUserAdapter } from "./user-pl.adapter";

export async function getUser(id: User["id"]) {
  return getUserAdapter(id);
}
