export function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[env] Missing required env var: ${name}`);
  }
  return value;
}

export function isPreviewEnv() {
  return process.env.VERCEL_ENV === "preview";
}

export function isPreviewOrDevEnv() {
  return process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";
}
