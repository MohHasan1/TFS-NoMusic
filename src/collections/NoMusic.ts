import type { CollectionConfig } from "payload";
import { capitalizeFirstLetter } from "./helpers/format";
import {
  assignNomusicLibraryAfterChange,
  syncUploadAudioURLBeforeValidate,
  syncUploadImageURLBeforeValidate,
} from "./hooks/noMusic";
import { LANGUAGES_VALUES } from "#constants/private/nomusic-language";

export const Nomusic: CollectionConfig = {
  slug: "nomusic",

  hooks: {
    beforeValidate: [syncUploadAudioURLBeforeValidate, syncUploadImageURLBeforeValidate],
    afterChange: [assignNomusicLibraryAfterChange],
  },

  admin: {
    useAsTitle: "name",
  },

  defaultPopulate: {
    id: true,
    name: true,
    duration: true,
    language: true,
    uploadedAudioURL: true,
    source: true,
    externalImageURL: true,
    uploadedImageURL: true,
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "audioFile",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "uploadedAudioURL",
      type: "text",
    },
    {
      name: "visibility",
      type: "select",
      defaultValue: "public",
      options: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: "artist",
      type: "text",
    },
    {
      name: "album",
      type: "text",
    },
    {
      name: "duration",
      type: "number",
    },
    {
      label: "coverImage",
      type: "collapsible",
      fields: [
        {
          name: "source",
          type: "select",
          defaultValue: "upload",
          options: [
            { label: "Upload", value: "upload" },
            { label: "External URL", value: "external_url" },
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
      name: "language",
      type: "select",
      index: true,
      required: true,
      options: LANGUAGES_VALUES.map((lang) => ({
        label: capitalizeFirstLetter(lang),
        value: lang,
      })),
    },
    {
      name: "genre",
      type: "select",
      options: [
        { label: "Pop", value: "pop" },
        { label: "Hip Hop", value: "hiphop" },
        { label: "Rock", value: "rock" },
        { label: "Electronic", value: "electronic" },
        { label: "Lo-fi", value: "lofi" },
        { label: "Classical", value: "classical" },
        { label: "Jazz", value: "jazz" },
        { label: "Other", value: "other" },
      ],
    },
  ],
};
