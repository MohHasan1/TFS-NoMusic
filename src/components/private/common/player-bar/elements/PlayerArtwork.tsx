"use client";

import { RiMusic2Line } from "@remixicon/react";
import Image from "next/image";
import { StatusDot } from "@/components/shared/StatusDot";
import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";
import { usePlayerPlayback } from "@/modules/player/hooks/usePlayerPlayback";

const PlayerArtwork = () => {
  const { track } = usePlayerTrack();
  const { isPlaying } = usePlayerPlayback(track?.id ?? "");

  if (!track) return null;

  return (
    <div className="relative shrink-0 size-11 md:size-12">
      {track?.coverImage ? (
        <div className="relative h-full w-full overflow-hidden bg-muted shadow-lg rounded-xl">
          <Image
            src={track.coverImage}
            alt="Track artwork"
            fill
            unoptimized
            sizes="48px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="size-full flex items-center justify-center text-muted-foreground rounded-xl bg-linear-to-bl from-primary-600/50 via-primary/50 to-secondary/50 ">
          <RiMusic2Line className="size-4" />
        </div>
      )}

      {isPlaying ? <StatusDot /> : null}
    </div>
  );
};

export default PlayerArtwork;
