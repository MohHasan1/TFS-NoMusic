"use client";

import Image from "next/image";
import { GlowOrb } from "#components/shared/GlowOrb";
import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";
import PlayerFallbackImage from "../elements/PlayerFallbackImage";

export function PlayerDialogContent() {
  const { track } = usePlayerTrack();

  if (!track) return null;

  return (
    <div>
      <GlowOrb position="center" />

      <div className="relative flex justify-center p-6">
        <div className="relative aspect-square w-full max-w-65">
          {track.coverImage ? (
            <div className="relative size-full overflow-hidden rounded-4xl">
              <Image
                src={track.coverImage}
                alt={`${track.name} artwork`}
                fill
                unoptimized
                sizes="(max-width: 768px) 80vw, 420px"
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
