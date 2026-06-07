import { logInfo } from "#loggers";
import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareImageLoader({ src, width, quality }: ImageLoaderProps) {
  logInfo("cl-loader ran.");
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [`width=${width}`, `quality=${quality ?? 80}`, "format=auto", "fit=scale-down"];

  return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}
