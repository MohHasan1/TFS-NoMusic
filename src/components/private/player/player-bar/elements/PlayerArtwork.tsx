"use client";

import { usePlayerPlayback } from "#playback-player/hooks/usePlayerPlayback";
import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";
import { StatusDot } from "#components/shared/StatusDot";

import { PlayerArtworkImage } from "../../elements/PlayerArtworkImage";
import PlayerFalbackImage from "../../elements/PlayerFallbackImage";
import PlayerDialogButton from "./PlayerDialogButton";

const PlayerArtwork = () => {
  const { track } = usePlayerTrack();
  const { isPlaying } = usePlayerPlayback(track?.id ?? "");

  return (
    <PlayerDialogButton className="p-0 h-auto w-auto">
      <div className="relative shrink-0 size-11 md:size-12">
        {track?.coverImage ? (
          <div className="relative h-full w-full overflow-hidden bg-muted shadow-lg rounded-xl">
            <PlayerArtworkImage
              src={track.coverImage}
              alt="Track artwork"
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
