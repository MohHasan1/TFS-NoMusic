import type { CollectionConfig } from "payload";
import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import { LANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { access } from "./access";
import { capitalizeFirstLetter } from "./helpers/format";
import { syncUploadImageURLBeforeValidate } from "./hooks/_shared";
import { assignNomusicLibraryAfterChange, revalidateNomusicAfterChange, revalidateNomusicAfterDelete, syncAudioDurationBeforeValidate, syncUploadAudioURLBeforeValidate } from "./hooks/noMusic";

export const Nomusic: CollectionConfig = {
  slug: "nomusic",

  hooks: {
    beforeValidate: [syncUploadAudioURLBeforeValidate, syncUploadImageURLBeforeValidate, syncAudioDurationBeforeValidate],
    afterChange: [assignNomusicLibraryAfterChange, revalidateNomusicAfterChange],
    afterDelete: [revalidateNomusicAfterDelete],
  },

  admin: {
    group: "Content",
    useAsTitle: "name",
  },

  defaultPopulate: NOMUSIC_DEFAULT_SELECT,

  access: {
    read: access.isLoggedIn,
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
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
      index: true,
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
