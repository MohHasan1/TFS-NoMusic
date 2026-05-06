import type { CollectionConfig } from "payload";
import { enrichRequestIdentityBeforeValidate } from "./hooks/requests";

export const Requests: CollectionConfig = {
  slug: "requests",

  admin: {
    useAsTitle: "type",
  },

  hooks: {
    beforeValidate: [enrichRequestIdentityBeforeValidate],
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
      options: ["access_request", "nomusic_request", "general_feedback", "bug_report"],
    },

    {
      name: "email",
      type: "email",
      required: true,
    },

    {
      name: "message",
      type: "textarea",
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
    },
  ],
};
