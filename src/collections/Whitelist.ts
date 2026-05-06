import type { CollectionConfig } from 'payload'

export const Whitelist: CollectionConfig = {
  slug: 'whitelist',

  admin: {
    useAsTitle: 'email',
  },

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'level_1',
    update: ({ req }) => req.user?.role === 'level_1',
    delete: ({ req }) => req.user?.role === 'level_1',
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
