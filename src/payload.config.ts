import { buildConfig } from "payload";

import { fileURLToPath } from "node:url";
import path from "node:path";

import { db } from "./db";
import { Admins, collections } from "./collections";
import { r2StoragePlugin } from "./plugins/storage/r2";
import { resendEmailAdapter } from "./plugins/mail/resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL:
    process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  db,
  email: resendEmailAdapter,
  collections,
  admin: {
    user: Admins.slug,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [r2StoragePlugin],
});
