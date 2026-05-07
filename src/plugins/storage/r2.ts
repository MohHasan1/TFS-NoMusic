import { s3Storage } from "@payloadcms/storage-s3";
import { getR2Env } from "./r2.env";

const r2 = getR2Env();



export const r2StoragePlugin = s3Storage({
  enabled: r2.enabled,
  alwaysInsertFields: true,
  collections: {
    media: {
      prefix: "nomusic",
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        const key = prefix ? `${prefix}/${filename}` : filename;
        return `${r2.enabled ? r2.publicUrl : ""}/${key}`;
      },
    },
  },
  useCompositePrefixes: true,
  bucket: r2.enabled ? r2.bucket : "",
  config: {
    credentials: {
      accessKeyId: r2.enabled ? r2.accessKeyId : "",
      secretAccessKey: r2.enabled ? r2.secretAccessKey : "",
    },
    region: "auto",
    endpoint: r2.enabled ? r2.endpoint : "",
    forcePathStyle: true,
  },
});
