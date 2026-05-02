
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

export default buildConfig({
    collections: [],
    secret: process.env.PAYLOAD_SECRET || '',
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URL || "file:./dev.db",
        },
    }),
})