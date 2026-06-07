"use client";

import Image from "next/image";
import { StatusDot } from "@/components/shared/StatusDot";
import PlayerFalbackImage from "../../elements/PlayerFallbackImage";
import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";
import { usePlayerPlayback } from "@/modules/player/hooks/usePlayerPlayback";
import PlayerDialogButton from "./PlayerDialogButton";

const PlayerArtwork = () => {
  const { track } = usePlayerTrack();
  const { isPlaying } = usePlayerPlayback(track?.id ?? "");

  return (
    <PlayerDialogButton className="p-0 h-auto w-auto">
      <div className="relative shrink-0 size-11 md:size-12">
        {track?.coverImage ? (
          <div className="relative h-full w-full overflow-hidden bg-muted shadow-lg rounded-xl">
            <Image
              src={track.coverImage}
              alt="Track artwork"
              fill
              sizes="(max-width: 768px) 44px, 48px"
              className="object-cover"
            />
          </div>
        ) : (
          <PlayerFalbackImage />
        )}

        {isPlaying ? <StatusDot /> : null}
      </div>
    </PlayerDialogButton>
  );
};

export default PlayerArtwork;
