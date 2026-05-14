import { RiMusic2Line } from "@remixicon/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type PlayerArtworkProps = {
  imageURL?: string | null;
  isPlaying?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<PlayerArtworkProps["size"]>, string> = {
  sm: "size-11 md:size-12",
  md: "size-14 md:size-16",
  lg: "size-full",
};

const ICON_CLASSES: Record<NonNullable<PlayerArtworkProps["size"]>, string> = {
  sm: "size-5",
  md: "size-7",
  lg: "size-16",
};

const SIZES_ATTR: Record<NonNullable<PlayerArtworkProps["size"]>, string> = {
  sm: "48px",
  md: "64px",
  lg: "(min-width: 768px) 400px, 90vw",
};

export function PlayerArtwork({ imageURL, isPlaying = false, size = "sm", className }: PlayerArtworkProps) {
  const radius = size === "lg" ? "rounded-2xl" : "rounded-xl";

  return (
    <div className={cn("relative shrink-0", SIZE_CLASSES[size], className)}>
      {imageURL ? (
        <div className={cn("relative h-full w-full overflow-hidden bg-muted shadow-lg", radius)}>
          <Image
            src={imageURL}
            alt="Track artwork"
            fill
            unoptimized
            sizes={SIZES_ATTR[size]}
            className="object-cover"
          />
        </div>
      ) : (
        <div className={cn("flex h-full w-full items-center justify-center bg-muted text-muted-foreground shadow-lg", radius)}>
          <RiMusic2Line className={ICON_CLASSES[size]} />
        </div>
      )}

      {isPlaying && size === "sm" ? (
        <span
          aria-hidden
          className="-top-1 -right-1 absolute size-3 rounded-full border-2 border-card bg-primary"
        />
      ) : null}
    </div>
  );
}
