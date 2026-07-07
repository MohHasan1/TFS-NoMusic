import type { CollectionConfig } from "payload";
import { DEFAULT_MEDIA_FOLDER, MEDIA_FOLDER_OPTIONS } from "./helpers/media";

import { access } from "./access";
import { addMediaTypeBeforeValidate } from "./hooks/media";

export const Media: CollectionConfig = {
  slug: "media",

  hooks: {
    beforeValidate: [addMediaTypeBeforeValidate],
  },

  admin: {
    group: "Content",
    useAsTitle: "filename",
  },

  access: {
    read: access.isLoggedIn, // public CDN URLs handle actual access control
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  upload: {
    mimeTypes: ["image/*", "audio/*"],
    focalPoint: false,
  },

  fields: [
    {
      name: "prefix",
      type: "select",
      label: "Folder",
      required: true,
      defaultValue: DEFAULT_MEDIA_FOLDER,
      options: MEDIA_FOLDER_OPTIONS,
      admin: {
        position: "sidebar",
        hidden: false,
        readOnly: false,
        description: "Choose this before selecting the file.",
      },
    },
    {
      name: "renameFileButton",
      type: "ui",
      admin: {
        components: {
          Field: "@/collections/components/renameMediaFilename#renameMediaFilename",
        },
      },
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
  ],
};
