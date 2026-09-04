import type { CollectionConfig } from "payload";
import { access } from "./access";
import { LIBRARY_TYPES } from "./constants/libraries";
import { capitalizeFirstLetter } from "./helpers/format";
import { syncUploadImageURLBeforeValidate } from "./hooks/_shared";
import { generateSlugBeforeValidate, revalidateLibraryAfterChange, revalidateLibraryAfterDelete } from "./hooks/Libraries";

export const Libraries: CollectionConfig = {
  slug: "libraries",

  admin: {
    group: "Libraries",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "trackCount"],
  },

  access: {
    read: access.isLoggedIn,
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  // add an auto count hook
  hooks: {
    beforeValidate: [generateSlugBeforeValidate, syncUploadImageURLBeforeValidate],
    afterChange: [revalidateLibraryAfterChange],
    afterDelete: [revalidateLibraryAfterDelete],
  },

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
          name: "author",
          type: "text",
          required: true,
          unique: true,
          defaultValue: "NoMusic",
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
          options: LIBRARY_TYPES.map((t) => ({
            label: capitalizeFirstLetter(t),
            value: t,
          })),
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
        },
      ],
    },
  ],
};
