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
      defaultValue: "level_1",
      options: ROLE_OPTIONS,
    },
  ],
};
