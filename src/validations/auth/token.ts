import Fields from "../shared";
import { z } from "zod";

export const TokenSchema = z.object({
  token: Fields.token(),
});

export type TTokenSchema = z.infer<typeof TokenSchema>;
