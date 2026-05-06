import { s3Storage } from "@payloadcms/storage-s3";

export const r2StoragePlugin = s3Storage({
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
});
