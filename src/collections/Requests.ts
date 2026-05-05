import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

const enrichMusicRequestIdentity: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data || data.type !== "music_request") return data;

  const metadata = (data.metadata as Record<string, unknown> | undefined) ?? {};
  const user = req.user;

  const userEmail = typeof user?.email === "string" ? user.email : undefined;
  const userFullName = typeof (user as { fullName?: unknown } | undefined)?.fullName === "string" ? (user as { fullName: string }).fullName : undefined;

  const resolvedEmail = userEmail || (typeof metadata.requestedByEmail === "string" ? metadata.requestedByEmail : undefined) || data.email;

  return {
    ...data,
    email: resolvedEmail,
    metadata: {
      ...metadata,
      requestedByEmail: resolvedEmail,
      requestedByName: userFullName || (typeof metadata.requestedByName === "string" ? metadata.requestedByName : undefined),
    },
  };
};

export const Requests: CollectionConfig = {
  slug: "requests",

  admin: {
    useAsTitle: "type",
  },

  hooks: {
    beforeValidate: [enrichMusicRequestIdentity],
  },

  access: {
    create: () => true,
    read: ({ req }) => {
      return req.user?.role === "level_1";
    },
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: ["access_request", "music_request", "general_feedback", "bug_report"],
    },

    {
      name: "email",
      type: "email",
      required: true,
    },

    {
      name: "message",
      type: "textarea",
      required: false,
    },

    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: ["pending", "approved", "rejected"],
    },

    {
      name: "metadata",
      type: "json",
      required: false,
    },
  ],
};
