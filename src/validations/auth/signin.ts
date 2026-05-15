import { SIGNIN_CLIENT } from "@/constants/auth/signin";
import Fields from "../shared";
import { z } from "zod";

export const SigninSchema = z.object({
  email: Fields.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: Fields.required(SIGNIN_CLIENT.VALIDATION_PASS_REQUIRED),
});

export const SigninStrictSchema = z.object({
  email: Fields.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: Fields.passwordSilent(),
});

export type TSigninSchema = z.infer<typeof SigninSchema>;
export type TSigninStrictSchema = z.infer<typeof SigninStrictSchema>;
