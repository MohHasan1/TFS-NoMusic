import type { CollectionConfig } from 'payload'

export const Whitelist: CollectionConfig = {
  slug: 'whitelist',

  admin: {
    useAsTitle: 'email',
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
