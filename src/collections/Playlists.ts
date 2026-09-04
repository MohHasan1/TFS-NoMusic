import type { CollectionConfig } from "payload";
import { access } from "./access";
import { playlistAccess } from "./access/playlist";
import { PLAYLIST_VISIBILITY_OPTIONS } from "./constants/playlists";
import { syncUploadImageURLBeforeValidate } from "./hooks/_shared";
import { assignOwnerBeforeValidate, generateSlugBeforeValidate, syncTrackCountBeforeChange } from "./hooks/playlists";

export const Playlists: CollectionConfig = {
  slug: "playlists",

  admin: {
    group: "Playlists",
    useAsTitle: "name",
    defaultColumns: ["name", "user", "visibility", "trackCount"],
  },

  access: {
    create: access.isLoggedIn,
    read: playlistAccess.canRead,
    update: access.isAdminOrOwnDoc,
    delete: access.isAdminOrOwnDoc,
  },

  hooks: {
    beforeValidate: [assignOwnerBeforeValidate, generateSlugBeforeValidate, syncUploadImageURLBeforeValidate],
    beforeChange: [syncTrackCountBeforeChange],
  },

  defaultPopulate: {
    id: true,
    name: true,
    slug: true,
    description: true,
    visibility: true,
    trackCount: true,
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
      admin: { readOnly: true },
      access: {
        update: () => false,
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      type: "group",
      label: "Cover Image",
      fields: [
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
      name: "visibility",
      type: "select",
      required: true,
      defaultValue: "private",
      options: [...PLAYLIST_VISIBILITY_OPTIONS],
    },
    {
      name: "tracks",
      type: "relationship",
      relationTo: "nomusic",
      hasMany: true,
      index: true,
    },
    {
      name: "trackCount",
      type: "number",
      defaultValue: 0,
    },
  ],
};
