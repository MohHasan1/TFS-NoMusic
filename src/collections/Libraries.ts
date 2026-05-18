import type { CollectionConfig } from "payload";
import { generateSlugBeforeValidate } from "./hooks/Libraries";

export const Libraries: CollectionConfig = {
  slug: "libraries",

  admin: {
    useAsTitle: "name",
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "level_1",
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  hooks: { beforeValidate: [generateSlugBeforeValidate] },

  fields: [
    {
      type: "group",
      label: "Basic Info",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },

    {
      type: "group",
      label: "Cover Image",
      fields: [
        {
          name: "source",
          type: "select",
          defaultValue: "external_url",
          options: [
            { label: "External URL", value: "external_url" },
            { label: "Upload", value: "upload" },
          ],
        },
        {
          name: "externalImageURL",
          type: "text",
        },
        {
          name: "imageFile",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "uploadedImageURL",
          type: "text",
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    {
      type: "group",
      label: "Collection Settings",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "language",
          admin: {
            description: "Defines how this library is used in the system (language-based grouping or curated content).",
          },
          options: [
            { label: "Language", value: "language" },
            { label: "Curated", value: "curated" },
          ],
        },
        {
          name: "sortOrder",
          type: "number",
          defaultValue: 0,
        },
      ],
    },

    {
      type: "group",
      label: "Metadata",
      fields: [
        {
          name: "songCount",
          type: "number",
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
};
