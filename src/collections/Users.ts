import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
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
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: true,
    },
      {
      name: 'role',
      type: 'select',
      defaultValue: 'level_4',
      options: [
        { label: 'Level 1', value: 'level_1' },
        { label: 'Level 2', value: 'level_2' },
        { label: 'Level 3', value: 'level_3' },
        { label: 'Level 4', value: 'level_4' },
      ],
    },
  ],
}
