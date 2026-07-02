"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export function OfflineImage({ src, alt, className, fallback = null }: TProps) {
  if (!src) {
    return fallback;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
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
  src?: string | null;
};
