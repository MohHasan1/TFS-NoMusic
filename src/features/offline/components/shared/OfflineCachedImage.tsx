"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { useCachedMediaUrl } from "#offline/hooks";

const isDev = process.env.NODE_ENV === "development";

export function OfflineCachedImage({ src, alt, sizes, className, fallback = null }: TProps) {
  const { url } = useCachedMediaUrl(src);

  if (!url) {
    // return fallback;
    return
  }

  return <Image src={url} alt={alt} fill unoptimized={isDev} sizes={sizes} className={className} />;
}

type TProps = {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  sizes: string;
  src?: string | null;
};
