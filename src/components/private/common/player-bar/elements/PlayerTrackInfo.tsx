"use client";

import { useTrackMetadata } from "@/modules/player/hooks/useTrackMetadata";

const PlayerTrackInfo = () => {
  console.count("PlayerTrackInfo render");

  const { track } = useTrackMetadata();

  if (!track) return null;

  return (
    <div className="min-w-0 flex flex-col items-start text-left">
      <h4 className="max-w-full truncate font-bold tracking-tight text-card-foreground text-sm" title={track.name}>
        {track.name}
      </h4>
      <p className="max-w-full truncate text-muted-foreground text-xs">{track.artist || "Unknown Artist"}</p>
    </div>
  );
};

export default PlayerTrackInfo;
