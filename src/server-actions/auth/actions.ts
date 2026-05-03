"use server";

import { redirect } from "next/navigation";

import {
  isWhitelistedEmail,
  logoutWithPayload,
  signInWithPayload,
  signUpWithPayload,
} from "@/services/auth/payload-auth.adapter";
import type { AuthActionState } from "@/services/auth/types";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await signInWithPayload({ email, password });
  } catch {
    return { error: "Invalid email or password." };
  }

  redirect("/no-music");
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = getString(formData, "fullName");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!fullName || !email || !password) {
    return { error: "Full name, email, and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const allowed = await isWhitelistedEmail(email);

  if (!allowed) {
    return {
      error:
        "This email is not approved for signup yet. Contact support for access.",
    };
  }

  try {
    await signUpWithPayload({ fullName, email, password });
  } catch {
    return { error: "Unable to create account. Try a different email." };
  }

  redirect("/login");
}

export async function logoutAction() {
  try {
    await logoutWithPayload();
  } catch {
    // Keep logout idempotent for UX; still redirect.
  }

  redirect("/login");
}
