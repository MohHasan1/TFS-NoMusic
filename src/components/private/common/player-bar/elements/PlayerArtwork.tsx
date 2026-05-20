"use client";

import { RiMusic2Line } from "@remixicon/react";
import Image from "next/image";
import { StatusDot } from "@/components/shared/StatusDot";
import { useTrackMetadata } from "@/modules/player/hooks/useTrackMetadata";
import { useTrackPlayback } from "@/modules/player/hooks/useTrackPlayback";

const PlayerArtwork = () => {
  console.count("PlayerArtwork render");

  const { track } = useTrackMetadata();
  const { isPlaying } = useTrackPlayback(track?.id ?? "");

  if (!track) return null;

  return (
    <div className="relative shrink-0 size-11 md:size-12">
      {track?.coverImage ? (
        <div className="relative h-full w-full overflow-hidden bg-muted shadow-lg rounded-xl">
          <Image src={track.coverImage} alt="Track artwork" fill unoptimized sizes="48px" className="object-cover" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground shadow-lg rounded-xl">
          <RiMusic2Line className="size-5" />
        </div>
      )}

      {isPlaying ? <StatusDot /> : null}
    </div>
  );
};

export default PlayerArtwork;
