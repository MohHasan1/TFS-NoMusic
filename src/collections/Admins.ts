import type { CollectionConfig } from "payload";
import { ROLE_OPTIONS } from "@/collections/constants/roles";

export const Admins: CollectionConfig = {
  slug: "admins",
  auth: true,
  admin: {
    group: "Auth",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [...ROLE_OPTIONS],
    },
  ],
};
