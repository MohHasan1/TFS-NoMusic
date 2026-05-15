import { Request } from "@/payload-types";
import type { CollectionBeforeValidateHook } from "payload";

export const enrichRequestIdentityBeforeValidate: CollectionBeforeValidateHook<Request> = async ({
  data,
  req,
}) => {
  if (!data || data.type !== "nomusic_request") return data;

  const metadata = (data.metadata as Record<string, unknown> | undefined) ?? {};
  const user = req.user;

  const userEmail = typeof user?.email === "string" ? user.email : undefined;
  const userFullName =
    typeof (user as { name?: unknown } | undefined)?.name === "string"
      ? (user as { name: string }).name
      : undefined;

  const resolvedEmail =
    userEmail ||
    (typeof metadata.requestedByEmail === "string" ? metadata.requestedByEmail : undefined) ||
    data.email;

  return {
    ...data,
    email: resolvedEmail,
    metadata: {
      ...metadata,
      requestedByEmail: resolvedEmail,
      requestedByName:
        userFullName ||
        (typeof metadata.requestedByName === "string" ? metadata.requestedByName : undefined),
    },
  };
};
