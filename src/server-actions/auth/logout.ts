"use server";

import { redirect, RedirectType } from "next/navigation";

import { PUBLIC_ROUTES } from "#constants/routes";
import { logout } from "#services/auth/auth.ports";
import { authLogger } from "#scoped-loggers";

export async function logoutAction() {
  // 1. Logout user:
  const res = await logout();
  if (!res.isSuccess) {
    authLogger(res);
    redirect(PUBLIC_ROUTES.HOME, RedirectType.replace);
  }

  // Successfull!
  redirect(PUBLIC_ROUTES.SIGNIN, RedirectType.replace);
}
