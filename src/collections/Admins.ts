import type { CollectionConfig } from 'payload'
import { ROLE_OPTIONS } from '@/collections/constants/roles'

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
      options: ROLE_OPTIONS,
    },
  ],
}
