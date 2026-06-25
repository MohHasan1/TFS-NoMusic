import type { CollectionConfig } from "payload";
import { access } from "./access";
import {
  syncLibraryTrackCountAfterChange,
  syncLibraryTrackCountAfterDelete,
} from "./hooks/NomusicLibraries";

export const NomusicLibraries: CollectionConfig = {
  slug: "nomusic-libraries",

  labels: {
    singular: "Nomusic Library",
    plural: "Nomusic Libraries",
  },

  admin: {
    defaultColumns: ["nomusic", "library", "updatedAt"],
  },

  access: {
    read: access.isLoggedIn,
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  hooks: {
    afterChange: [syncLibraryTrackCountAfterChange],
    afterDelete: [syncLibraryTrackCountAfterDelete],
  },

  indexes: [
    {
      unique: true,
      fields: ["nomusic", "library"],
    },
  ],

  fields: [
    {
      name: "nomusic",
      type: "relationship",
      relationTo: "nomusic",
      required: true,
      index: true,
    },

    {
      name: "library",
      type: "relationship",
      relationTo: "libraries",
      required: true,
      index: true,
    },

    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
