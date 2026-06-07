import { s3Storage } from "@payloadcms/storage-s3";
import { getR2Env } from "./r2.env";

const r2 = getR2Env();

export const r2StoragePlugin = s3Storage({
  enabled: r2.enabled,
  clientUploads: true,
  alwaysInsertFields: true,
  collections: {
    media: {
      prefix: "nomusic",
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        const baseURL = r2.enabled ? r2.publicUrl.replace(/\/+$/, "") : "";

        const key = ["nomusic", prefix, encodeURIComponent(filename)].filter(Boolean).join("/");

        return `${baseURL}/${key}`;
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
