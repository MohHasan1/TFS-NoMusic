import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Admins, collections } from "./collections";

const dbProvider = process.env.DB_PROVIDER?.toLowerCase();
const useMongo = dbProvider === "mongodb" || (!dbProvider && process.env.NODE_ENV === "production");
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
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
      alwaysInsertFields: true,
      collections: {
        media: {
          prefix: "nomusic",
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${process.env.R2_PUBLIC_URL}/${key}`;
          },
        },
      },
      useCompositePrefixes: true,
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
