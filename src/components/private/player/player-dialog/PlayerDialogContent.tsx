"use client";

import Image from "next/image";
import { GlowOrb } from "#components/shared/GlowOrb";
import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";
import PlayerFallbackImage from "../elements/PlayerFallbackImage";

const isDev = process.env.NODE_ENV === "development";

export function PlayerDialogContent() {
  const { track } = usePlayerTrack();

  if (!track) return null;

return (
<div className="relative flex min-h-0 flex-1 overflow-hidden">
  <GlowOrb position="center" />

  <div className="relative flex min-h-0 flex-1 overflow-hidden px-2 py-6">
    <div className="relative aspect-square w-full [@media(max-height:500px)]:hidden">
      {track.coverImage ? (
        <div className="relative size-full overflow-hidden rounded-4xl">
          <Image
            src={track.coverImage}
            alt={`${track.name} artwork`}
            fill
            unoptimized={isDev}
            sizes="(max-width: 640px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      ) : (
        <PlayerFallbackImage iconClassname="size-8" />
      )}
    </div>
  </div>
</div>
);
}
