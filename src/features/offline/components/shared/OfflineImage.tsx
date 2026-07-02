"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export function OfflineImage({ src, alt, sizes, className, fallback = null }: TProps) {
  if (!src) {
    return fallback;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

type TProps = {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  sizes: string;
  src?: string | null;
};
