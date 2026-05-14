import { REQUEST_ACCESS_CLIENT } from "@/constants/public/request-access";
import { z } from "zod";

export const RequestAccessSchema = z.object({
  name: z
    .string()
    .min(2, REQUEST_ACCESS_CLIENT.VALIDATION_MIN_NAME_ERROR)
    .max(25, REQUEST_ACCESS_CLIENT.VALIDATION_MAX_NAME_ERROR),
  email: z.email(REQUEST_ACCESS_CLIENT.VALIDATION_EMAIL_ERROR),
});

export type TRequestAccessSchema = z.infer<typeof RequestAccessSchema>;
