import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'level_1',
      options: [
        { label: 'Level 1', value: 'level_1' },
        { label: 'Level 2', value: 'level_2' },
        { label: 'Level 3', value: 'level_3' },
        { label: 'Level 4', value: 'level_4' },
      ],
    },
  ],
}
