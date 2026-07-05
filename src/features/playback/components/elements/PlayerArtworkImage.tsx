"use client";

import Image from "next/image";

import { OFFLINE_STORAGE } from "#offline/constants";

function isOfflineArtwork(src: string) {
  return src.startsWith(OFFLINE_STORAGE.ROOT_PATH);
}

type TProps = {
  alt: string;
  className?: string;
  sizes: string;
  src: string;
};

export function PlayerArtworkImage({ src, alt, sizes, className }: TProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      // Offline artwork should bypass the global Cloudflare image loader.
      unoptimized={isOfflineArtwork(src)}
      sizes={sizes}
      className={className}
    />
  );
}
