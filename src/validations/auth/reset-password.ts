import { RESET_PASSWORD_CLIENT } from "@/constants/auth/reset-password";
import { z } from "zod";
import Fields from "../shared";

export const ResetPasswordSchema = z
  .object({
    password: Fields.password({
      min: RESET_PASSWORD_CLIENT.VALIDATION_PASS_SIZE_ERROR,
      strength: RESET_PASSWORD_CLIENT.VALIDATION_PASS_STRENGTH_ERROR,
    }),
    confirmPassword: Fields.required(RESET_PASSWORD_CLIENT.VALIDATION_CONFIRM_PASS_EMPTY_ERROR),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: RESET_PASSWORD_CLIENT.VALIDATION_CONFIRM_PASS_MISMATCH_ERROR,
    path: ["confirmPassword"],
  });

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
