import { requireEnv } from "@/lib/env";

export function getR2Env(): R2Env {
  const enabled = Boolean(process.env.R2_BUCKET);

  if (!enabled) {
    return { enabled: false };
  }

  return {
    enabled: true,
    bucket: requireEnv("R2_BUCKET"),
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    endpoint: requireEnv("R2_ENDPOINT"),
    publicUrl: requireEnv("R2_PUBLIC_URL"),
  };
}

export type R2Env =
  | { enabled: false }
  | {
      enabled: true;
      bucket: string;
      accessKeyId: string;
      secretAccessKey: string;
      endpoint: string;
      publicUrl: string;
    };
