import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

import { Admins, collections } from "./collections";

const dbProvider = process.env.DB_PROVIDER?.toLowerCase();
const useMongo = dbProvider === "mongodb" || (!dbProvider && process.env.NODE_ENV === "production");

export default buildConfig({
  collections,
  admin: {
    user: Admins.slug,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: useMongo
    ? mongooseAdapter({
        url: process.env.MONGODB_URI || "",
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URL || "file:./dev.db",
        },
      }),
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${process.env.R2_PUBLIC_URL}/${key}`;
          },
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
  ],
});
