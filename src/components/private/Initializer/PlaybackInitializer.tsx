"use client";

import { useTrackSession } from "#playback/modules/hooks/useTrackSession";
import { useTrackAutoPlay } from "#playback/modules/hooks/useTrackAutoPlay";

const PlaybackInitializer = () => {
  useTrackAutoPlay();
  useTrackSession();

  return null;
};

export default PlaybackInitializer;
