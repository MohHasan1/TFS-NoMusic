import type { CollectionConfig } from "payload";
import { ROLE_OPTIONS } from "@/collections/constants/roles";

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    verify: true,
  },

  admin: {
    useAsTitle: "fullName",
  },

  // TODO: improve this
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "isApproved",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "role",
      type: "select",
      defaultValue: "level_4",
      options: ROLE_OPTIONS,
    },
  ],
};
