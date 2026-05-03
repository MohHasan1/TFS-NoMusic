import {
  getCurrentUser as getCurrentUserFromAdapter,
  logoutUser as logoutUserFromAdapter,
  signIn as signInFromAdapter,
  signUp as signUpFromAdapter,
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
