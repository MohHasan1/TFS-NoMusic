"use server";

import { redirect } from "next/navigation";

import { PUBLIC_ROUTES } from "#constants/routes";
import { logoutUser } from "#services/auth/auth.ports";

export async function logoutAction() {
  // 1. Logout user:
  await logoutUser();

  // Successfull!
  redirect(PUBLIC_ROUTES.SIGNIN);
}
