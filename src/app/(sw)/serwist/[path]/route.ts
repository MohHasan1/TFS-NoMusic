import { createSerwistRoute } from "@serwist/turbopack";
import { preCache } from "#offline/service-worker/pre-cache";

const serwistRouteConfig = {
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
  globPatterns: preCache.globPatterns,
  additionalPrecacheEntries: preCache.entries,
};

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute(serwistRouteConfig);
