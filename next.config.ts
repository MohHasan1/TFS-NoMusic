import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ['192.168.1.115', "sam-hostels-carrier-exhaust.trycloudflare.com"],
  // cacheComponents: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudflare/image-loader.ts",
    deviceSizes: [320, 384, 448, 640, 750, 828],
    imageSizes: [32, 48, 64, 96, 128, 256],
  },
};

export default withPayload(nextConfig);
