import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ['192.168.1.115', "sam-hostels-carrier-exhaust.trycloudflare.com"],
  // cacheComponents: true,
    images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudflare/image-loader.ts",
  },
};

export default withPayload(nextConfig);
