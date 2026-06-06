"use client";

import { useTrackSession } from "#modules/hooks/useTrackSession";
import { useTrackAutoPlay } from "#modules/hooks/useTrackAutoPlay";

const PlaybackInitializer = () => {
  useTrackAutoPlay();
  useTrackSession();

  return null;
};

export default PlaybackInitializer;
