import { z } from "zod";

const email = (message: string = "Invalid email") => z.email(message);

const name = (messages: { min?: string; max?: string }) =>
  z
    .string()
    .min(2, messages.min ?? "Your name is too short.")
    .max(25, messages.max ?? "Your name is too long.");

const password = (messages: { min?: string; strength?: string }) =>
  z
    .string()
    .min(8, messages.min ?? "Your password is too short.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      messages.strength ??
        "Your password needs uppercase, lowercase, number, and special character.",
    );

const passwordSilent = () =>
  z
    .string()
    .min(8)
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value), {
      message: "",
    });

const required = (message: string) => z.string().min(1, message);

export const token = (message = "Invalid verification token") =>
  z.string().min(10, message).max(100, message);

const Fields = { email, token, name, password, passwordSilent, required };
export default Fields;

// export const confirmPasswordField = (message = "Please confirm your password.") =>
//   z.string().min(1, message);

// export const passwordMatchRefine = (message: string) => ({
//   message,
//   path: ["confirmPassword"] as const,
// });
