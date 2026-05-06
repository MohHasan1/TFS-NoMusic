import { buildConfig } from "payload";

import { fileURLToPath } from "node:url";
import path from "node:path";

import { Admins, collections } from "./collections";
import { db } from "./db";
import { r2StoragePlugin } from "./plugins/storage/r2";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  db,
  collections,
  admin: {
    user: Admins.slug,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [r2StoragePlugin],
});
