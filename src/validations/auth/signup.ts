import { z } from "zod";
import { SIGNUP_CLIENT } from "#constants/auth/signup";
import Fields from "../shared";

export const SignupSchema = z
  .object({
    name: Fields.name({
      min: SIGNUP_CLIENT.VALIDATION_NAME_MIN_ERROR,
      max: SIGNUP_CLIENT.VALIDATION_NAME_MAX_ERROR,
    }),

    email: Fields.email(SIGNUP_CLIENT.VALIDATION_EMAIL_ERROR),

    password: Fields.password({
      min: SIGNUP_CLIENT.VALIDATION_PASS_MIN_ERROR,
      strength: SIGNUP_CLIENT.VALIDATION_PASS_STRENGTH_ERROR,
    }),

    confirmPassword: Fields.required(SIGNUP_CLIENT.VALIDATION_CONFIRM_PASS_EMPTY_ERROR),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: SIGNUP_CLIENT.VALIDATION_CONFIRM_PASS_MISMATCH_ERROR,
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof SignupSchema>;
