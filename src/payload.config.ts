import path from "node:path";

import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { Admins, collections } from "./collections";
import { db } from "./plugins/db";
import { resendEmailAdapter } from "./plugins/mail/resend";
import { r2StoragePlugin } from "./plugins/storage/r2";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  db,
  email: resendEmailAdapter,
  collections,
  admin: {
    user: Admins.slug,
    autoLogin:
      process.env.NODE_ENV === "development"
        ? {
            email: "hasan.swe.dev@gmail.com",
            password: "123",
            prefillOnly: true,
          }
        : false,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [r2StoragePlugin],
});
