import { FORGOT_PASSWORD_CLIENT } from "@/constants/auth/forgot-password";
import Fields from "../shared";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: Fields.email(FORGOT_PASSWORD_CLIENT.VALIDATION_EMAIL_ERROR),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
