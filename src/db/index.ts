import { requireEnv } from "@/lib/env";
import { makeSqliteDb } from "./sqlite";
import { makeMongooseDb } from "./mongoose";

const env = process.env.NODE_ENV || "development";
const vercelEnv = process.env.VERCEL_ENV;
const provider = process.env.DB_PROVIDER?.toLowerCase();

export function getDb(): DbAdapter {
  // 1. Production always uses PROD_DB_URL.
  if (env === "production") {
    const prodUrl = requireEnv("PROD_DB_URL");
    return makeMongooseDb(prodUrl);
  }

  // 2. Development uses DB_PROVIDER to choose local DB source.
  if (env === "development") {
    switch (provider) {
      case "mongodb": {
        const mongoUrl = requireEnv("MONGODB_URI");
        return makeMongooseDb(mongoUrl);
      }
      default: {
        const sqliteUrl = process.env.SQLITE_URL || "file:./dev.db";
        return makeSqliteDb(sqliteUrl);
      }
    }
  }

  // 3. Preview always uses PREVIEW_DB_URL.
  if (vercelEnv === "preview") {
    const previewUrl = requireEnv("PREVIEW_DB_URL");
    return makeMongooseDb(previewUrl);
  }

  if (process.env.NODE_ENV) {
    throw new Error('[db] NODE_ENV must be "development" or "production".');
  }

  const sqliteUrl = process.env.SQLITE_URL || "file:./dev.db";
  return makeSqliteDb(sqliteUrl);
}

export const db = getDb();
type DbAdapter = ReturnType<typeof makeMongooseDb> | ReturnType<typeof makeSqliteDb>;
