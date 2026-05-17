import { SIGNIN_CLIENT } from "#constants/auth/signin";
import Fields from "../shared";
import { z } from "zod";

// NOTE: password strength is not checked - just required - used in form handler for UI. 
export const SigninSchema = z.object({
  email: Fields.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: Fields.required(SIGNIN_CLIENT.VALIDATION_PASS_REQUIRED),
});

// NOTE: password strength is checked - used for early client and server side checks.
export const SigninStrictSchema = z.object({
  email: Fields.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: Fields.passwordSilent(),
});

export type TSigninSchema = z.infer<typeof SigninSchema>;
export type TSigninStrictSchema = z.infer<typeof SigninStrictSchema>;
