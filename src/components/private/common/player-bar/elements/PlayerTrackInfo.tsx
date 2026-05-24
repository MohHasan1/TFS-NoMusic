"use client";

import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

const PlayerTrackInfo = () => {
  const { track } = usePlayerTrack();
  if (!track) return null;

  return (
    <div className="max-w-28 lg:max-w-44 flex flex-col justify-center items-start text-left">
      <h4
        className="w-full truncate font-bold tracking-tight text-card-foreground text-sm capitalize"
        title={track.name}
      >
        {track.name}
      </h4>

      <p
        className="w-full truncate text-muted-foreground text-xs capitalize"
        title={track.artist || "Unknown Artist"}
      >
        {track.artist || "Unknown Artist"}
      </p>
    </div>
  );
};

export default PlayerTrackInfo;
