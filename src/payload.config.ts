import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import { collections, Admins } from './collections'

export default buildConfig({
    collections,
    admin: {
        user: Admins.slug,
    },
    secret: process.env.PAYLOAD_SECRET || '',
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URL || "file:./dev.db",
        },
    }),
})