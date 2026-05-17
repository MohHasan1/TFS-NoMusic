/*
  Creates a logger that only runs when its scope is enabled.
*/

import { logInfo } from "./base";

export function createLogger(service: string, logfn: (...info: unknown[]) => void = logInfo) {
  const enabled = new Set(
    (process.env.NEXT_PUBLIC_LOG_SERVICE ?? "").split(",").map((s) => s.trim()),
  );

  return (...info: unknown[]) => {
    if (enabled.has(service)) {
      logfn(...info);
    }
  };
}
