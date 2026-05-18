import type { CollectionConfig } from "payload";

export const NomusicLibraries: CollectionConfig = {
  slug: "nomusic-libraries",

  labels: {
    singular: "Nomusic Library",
    plural: "Nomusic Libraries",
  },

  admin: {
    defaultColumns: ["nomusic", "library", "updatedAt"],
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "level_1",
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  indexes: [
    {
      unique: true,
      fields: ["nomusic", "library"],
    },
  ],

  fields: [
    {
      name: "nomusic",
      type: "relationship",
      relationTo: "nomusic",
      required: true,
      index: true,
    },

    {
      name: "library",
      type: "relationship",
      relationTo: "libraries",
      required: true,
      index: true,
    },

    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
