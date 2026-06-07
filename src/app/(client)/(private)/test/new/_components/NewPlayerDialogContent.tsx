"use client";

import Image from "next/image";
import PlayerFallbackImage from "#components/private/player/elements/PlayerFallbackImage";
import { GlowOrb } from "#components/shared/GlowOrb";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

export function NewPlayerDialogContent() {
  const { track } = usePlayerTrack();

  if (!track) return null;

  return (
    <div>
      <GlowOrb position="center" />

      <div className="relative flex justify-center px-2 py-6">
        <div className="relative aspect-square w-full">
          {track.coverImage ? (
            <div className="relative size-full overflow-hidden rounded-4xl">
              <Image src={track.coverImage} alt={`${track.name} artwork`} fill sizes="(max-width: 640px) calc(100vw - 1rem), 448px" className="object-cover" />
            </div>
          ) : (
            <PlayerFallbackImage iconClassname="size-8" />
          )}
        </div>
      </div>
    </div>
  );
}
