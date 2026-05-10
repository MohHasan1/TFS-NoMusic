import { z } from "zod";

// -- Sign up validation
export const SignupSchema = z
  .object({
    name: z.string().min(2, "Your name is too short.").max(52, "Your name is too long."),

    email: z.email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Your password is too short (minimum 8 characters).")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Your password needs at least one uppercase letter, one lowercase letter, and one number.",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Please try again.",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof SignupSchema>;

// -- Sign in validation
export const SigninSchema = z.object({
  email: z.email("Please enter a valid email address."),

  password: z.string().min(1, "Password is required."),
});

export type TSigninSchema = z.infer<typeof SigninSchema>;
