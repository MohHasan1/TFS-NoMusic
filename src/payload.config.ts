import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
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
});
