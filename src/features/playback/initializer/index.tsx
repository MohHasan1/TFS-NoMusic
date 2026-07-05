"use client";

import { useTrackSession } from "#playback/hooks/useTrackSession";
import { useTrackAutoPlay } from "#playback/hooks/useTrackAutoPlay";

const PlaybackInitializer = () => {
  useTrackAutoPlay();
  useTrackSession();

  return null;
};

export default PlaybackInitializer;
