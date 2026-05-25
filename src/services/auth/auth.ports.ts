import {
  forgotPasswordAdapter,
  getCurrentUserAdapter,
  logoutAdapter,
  resetPasswordAdapter,
  signinAdapter,
  signupAdapter,
  verifyEmailAdapter,
} from "@/services/auth/auth-pl.adapter";
import type { TSignin, TSignup } from "#services/auth/auth.types";

export async function signIn(data: TSignin) {
  return signinAdapter(data);
}

export async function signUp(data: TSignup) {
  return signupAdapter(data);
}

export async function logoutUser() {
  return logoutAdapter();
}

export async function verifyEmail(token: string) {
  return verifyEmailAdapter(token);
}

export async function forgotPassword(email: string) {
  return forgotPasswordAdapter(email);
}

export async function resetPassword(token: string, password: string) {
  return resetPasswordAdapter(token, password);
}

export async function getCurrentUser() {
  return getCurrentUserAdapter();
}
