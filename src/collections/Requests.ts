import type { CollectionConfig } from "payload";
import { REQUEST_TYPE_OPTIONS } from "./constants/requests";
import { fillUserInfoBeforeValidate } from "./hooks/requests";

export const Requests: CollectionConfig = {
  slug: "requests",

  admin: {
    useAsTitle: "type",
  },

  hooks: {
    beforeValidate: [fillUserInfoBeforeValidate],
  },

  access: {
    create: () => true,
    read: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [...REQUEST_TYPE_OPTIONS],
    },

    {
      name: "name",
      type: "text",
    },

    {
      name: "email",
      type: "email",
    },

    {
      name: "message",
      type: "textarea",
    },

    {
      name: "url",
      type: "text",
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
