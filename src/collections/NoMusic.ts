import type { CollectionConfig } from "payload";
import { LANGUAGES_VALUES } from "./constants/libraries";
import { capitalizeFirstLetter } from "./helpers/format";
import { syncUploadAudioURLBeforeValidate, syncUploadImageURLBeforeValidate } from "./hooks/noMusic";

export const Nomusic: CollectionConfig = {
  slug: "nomusic",

  hooks: {
    beforeValidate: [syncUploadAudioURLBeforeValidate, syncUploadImageURLBeforeValidate],
  },

  admin: {
    useAsTitle: "title",
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "level_1",
    update: ({ req }) => req.user?.role === "level_1",
    delete: ({ req }) => req.user?.role === "level_1",
  },

  // TODO: add slug, chnage title to name
  fields: [
    {
      name: "title",
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
      name: "coverImage",
      type: "group",
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
      name: "language",
      type: "select",
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
