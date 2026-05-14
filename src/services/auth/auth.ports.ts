import {
  getCurrentUser as getCurrentUserFromAdapter,
  logoutUser as logoutUserFromAdapter,
  signIn as signInFromAdapter,
  signUp as signUpFromAdapter,
  verifyEmail as verifyEmailFromAdapter,
  forgotPassword as forgotPasswordFromAdapter,
  resetPassword as resetPasswordFromAdapter,
} from "@/services/auth/auth-pl.adapter";
import type { SignInDTO, SignUpDTO } from "@/services/auth/dto";

export async function signIn(input: SignInDTO) {
  return signInFromAdapter(input);
}

export async function signUp(input: SignUpDTO) {
  return signUpFromAdapter(input);
}

export async function logoutUser() {
  return logoutUserFromAdapter();
}

export async function getCurrentUser() {
  return getCurrentUserFromAdapter();
}

export async function verifyEmail(token: string) {
  return verifyEmailFromAdapter(token);
}

export async function forgotPassword(email: string) {
  return forgotPasswordFromAdapter(email);
}

export async function resetPassword(token: string, password: string) {
  return resetPasswordFromAdapter(token, password);
}
