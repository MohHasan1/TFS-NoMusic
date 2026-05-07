import type { CollectionConfig } from "payload";

export const Whitelist: CollectionConfig = {
  slug: "whitelist",

  admin: {
    useAsTitle: "email",
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
  ],
};
