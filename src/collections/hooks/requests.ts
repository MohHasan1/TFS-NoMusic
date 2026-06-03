import { Request } from "#payload-types";
import type { CollectionBeforeValidateHook } from "payload";

export const fillUserInfoBeforeValidate: CollectionBeforeValidateHook<Request> = async ({
  data,
  operation,
  req,
}) => {
  if (!data || data.type !== "nomusic_request" || operation === "update") return data;

  const user = req.user;

  const email = typeof user?.email === "string" ? user.email : undefined;
  const name = typeof user?.name === "string" ? user.name : undefined;

  const resolvedEmail = email || data.email;

  return {
    ...data,
    email: resolvedEmail,
    name: name,
  };
};
