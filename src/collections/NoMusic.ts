import type { CollectionConfig } from "payload";
import { syncStreamURLBeforeValidate } from "./hooks/noMusic";

export const NoMusic: CollectionConfig = {
  slug: "nomusic",

  hooks: {
    beforeValidate: [syncStreamURLBeforeValidate],
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
      name: "streamURL",
      type: "text",
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
          defaultValue: "url",
          options: [
            { label: "URL", value: "url" },
            { label: "Upload", value: "upload" },
          ],
        },
        {
          name: "url",
          type: "text",
        },
        {
          name: "upload",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "language",
      type: "select",
      defaultValue: "english",
      options: [
        { label: "English", value: "english" },
        { label: "Hindi", value: "hindi" },
        { label: "Bangla", value: "bangla" },
        { label: "Arabic", value: "arabic" },
        { label: "Other", value: "other" },
      ],
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
