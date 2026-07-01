import { withPayload } from "@payloadcms/next/withPayload";
import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudflare/image-loader.ts",
    deviceSizes: [320, 384, 448, 640, 750, 828],
    imageSizes: [32, 48, 64, 96, 128, 256],
  },
};

export default withSerwist(withPayload(nextConfig));
