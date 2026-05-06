import type { CollectionConfig } from "payload";
import { detectMediaTypeBeforeValidate, setMediaPrefixBeforeValidate } from "./hooks/media";
import { DEFAULT_MEDIA_FOLDER, MEDIA_FOLDER_OPTIONS } from "./helpers/media";

export const Media: CollectionConfig = {
  slug: "media",

  hooks: {
    beforeValidate: [setMediaPrefixBeforeValidate, detectMediaTypeBeforeValidate],
  },

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
      name: "folder",
      type: "select",
      required: true,
      defaultValue: DEFAULT_MEDIA_FOLDER,
      options: MEDIA_FOLDER_OPTIONS,
    },
    {
      name: "alt",
      type: "text",
    },

    {
      name: "type",
      type: "select",
      defaultValue: "audio",
      options: [
        { label: "Audio", value: "audio" },
        { label: "Image", value: "image" },
        { label: "Other", value: "other" },
      ],
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
