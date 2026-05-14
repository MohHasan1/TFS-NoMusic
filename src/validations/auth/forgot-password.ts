import { FORGOT_PASSWORD_CLIENT } from "@/constants/auth/forgot-password";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.email(FORGOT_PASSWORD_CLIENT.VALIDATION_EMAIL_ERROR),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
