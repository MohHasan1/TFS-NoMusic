import { z } from "zod";

export const VerifyEmailSchema = z.object({
  token: z.string().min(10, "Invalid verification token").max(100, "Invalid verification token"),
});

export type TVerifyEmailSchema = z.infer<typeof VerifyEmailSchema>;
