import { SIGNIN_CLIENT } from "@/constants/auth/signin";
import { z } from "zod";

export const SigninSchema = z.object({
  email: z.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: z.string().min(1, SIGNIN_CLIENT.VALIDATION_PASS_REQUIRED),
});

export const SigninStrictSchema = z.object({
  email: z.email(SIGNIN_CLIENT.VALIDATION_EMAIL_ERROR),
  password: z
    .string()
    .min(1, SIGNIN_CLIENT.VALIDATION_PASS_REQUIRED)
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value), {
      message: "",
    }),
});

export type TSigninSchema = z.infer<typeof SigninSchema>;
export type TSigninStrictSchema = z.infer<typeof SigninStrictSchema>;
