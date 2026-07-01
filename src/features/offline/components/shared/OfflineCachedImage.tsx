"use client";

import type { ReactNode } from "react";

export function OfflineCachedImage({ src, alt, sizes, className, fallback = null }: TProps) {
  if (!src) {
    return fallback;
  }

  // biome-ignore lint/performance/noImgElement: Offline media must keep the raw /offline-media URL so the service worker can intercept it.
  return (
    <img src={src} alt={alt} sizes={sizes} loading="lazy" decoding="async" className={className} />
  );
}

type TProps = {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  sizes: string;
  src?: string | null;
};
