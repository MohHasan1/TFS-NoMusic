import type { CollectionConfig } from "payload";
import { CURATED_VALUES, LIBRARY_TYPES } from "./constants/libraries";
import { capitalizeFirstLetter } from "./helpers/format";
import { generateSlugBeforeValidate, validateLibraryBeforeValidate } from "./hooks/Libraries";
import { LANGUAGES_VALUES } from "#constants/private/nomusic-language";

export const Libraries: CollectionConfig = {
  slug: "libraries",

  admin: {
    useAsTitle: "name",
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  hooks: { beforeValidate: [generateSlugBeforeValidate, validateLibraryBeforeValidate] },

  defaultPopulate: {
    id: true,
    name: true,
    slug: true,
    description: true,
  },

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
      label: "Library Settings",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "language",
          options: LIBRARY_TYPES.map((t) => ({
            label: capitalizeFirstLetter(t),
            value: t,
          })),
        },
        {
          name: "language",
          type: "select",
          options: LANGUAGES_VALUES.map((l) => ({
            label: capitalizeFirstLetter(l),
            value: l,
          })),
          admin: {
            condition: (_, data) => data.type === "language",
            description: "Used only for language libraries",
          },
        },
        {
          name: "curated",
          type: "select",
          options: CURATED_VALUES.map((c) => ({
            label: capitalizeFirstLetter(c),
            value: c,
          })),
          admin: {
            condition: (_, data) => data.type === "curated",
            description: "Used only for curated libraries - not used, its here as a reminder.",
          },
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
      label: "Metadata",
      fields: [
        {
          name: "trackCount",
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
