import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

const syncStreamURLFromAudioFile: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data) return data;

  const audioFile = data.audioFile;
  if (!audioFile) return data;

  if (typeof audioFile === "object" && audioFile !== null && "url" in audioFile) {
    const mediaURL = typeof audioFile.url === "string" ? audioFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      streamURL: mediaURL,
    };
  }

  if (typeof audioFile === "number" || typeof audioFile === "string") {
    const media = await req.payload.findByID({
      collection: "media",
      id: audioFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      streamURL: media.url,
    };
  }

  return data;
};

export const NoMusic: CollectionConfig = {
  slug: "nomusic",

  hooks: {
    beforeValidate: [syncStreamURLFromAudioFile],
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
      name: "audioFile",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "streamURL",
      type: "text",
      required: false,
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
