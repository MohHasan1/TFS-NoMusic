"use server";

import { redirect } from "next/navigation";

import { logoutUser } from "@/services/auth/auth.ports";

export async function logoutAction() {
  try {
    await logoutUser();
  } catch {
    // Keep logout idempotent for UX; still redirect.
  }

  redirect("/login");
}
