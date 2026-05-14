import { RESET_PASSWORD_CLIENT } from "@/constants/auth/reset-password";
import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, RESET_PASSWORD_CLIENT.VALIDATION_PASS_ERROR)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Your password needs at least one uppercase letter, one lowercase letter, and one number.",
      ),
    confirmPassword: z.string().min(8, RESET_PASSWORD_CLIENT.VALIDATION_CONFIRM_PASS_ERROR),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: RESET_PASSWORD_CLIENT.VALIDATION_CONFIRM_PASS_ERROR,
    path: ["confirmPassword"],
  });

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
