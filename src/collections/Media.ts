import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",

  admin: {
    useAsTitle: "filename",
  },

  access: {
    read: () => true, // public CDN URLs handle actual access control
    create: ({ req }) => req.user?.role === "level_1",
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "audio/*"],
    focalPoint: false,
  },

  fields: [
    {
      name: "alt",
      type: "text",
    },

    {
      name: "type",
      type: "select",
      options: [
        { label: "Audio", value: "audio" },
        { label: "Image", value: "image" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "image",
    },

    {
      name: "mimeType",
      type: "text",
    },

    {
      name: "size",
      type: "number",
    },
  ],
};
