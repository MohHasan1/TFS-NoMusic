import { requireEnv } from "@/lib/env";
import { makeSqliteDb } from "./sqlite";
import { makeMongooseDb } from "./mongoose";

const vercelEnv = process.env.VERCEL_ENV;
const env = process.env.NODE_ENV || "development";
const provider = process.env.DB_PROVIDER?.toLowerCase();

export function getDb(): DbAdapter {
  // -- Vercel Preview
  if (vercelEnv === "preview" && env === "production") {
    return makeMongooseDb(requireEnv("PREVIEW_DB_URL"));
  }

  // -- Vercel Production
  if (vercelEnv === "production" && env === "production") {
    return makeMongooseDb(requireEnv("PROD_DB_URL"));
  }

  // -- Local Development
  if (env === "development") {
    switch (provider) {
      case "mongodb":
        return makeMongooseDb(requireEnv("MONGODB_URI"));

      default:
        return makeSqliteDb(process.env.SQLITE_URL || "file:./dev.db");
    }
  }

  // NOTE: THIS IS FOR BUILD TO PASS BUT IT WILL NOT BE USED AT BUILD TIME
  if (env === "production" && !vercelEnv) return makeSqliteDb(process.env.SQLITE_URL || "file:./dev.db");

  throw new Error(
    `[db] Unsupported environment. NODE_ENV must be "development" or "production". ${env}`,
  );
}

type DbAdapter = ReturnType<typeof makeMongooseDb> | ReturnType<typeof makeSqliteDb>;

export const db = getDb();
