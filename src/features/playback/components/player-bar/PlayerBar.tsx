"use client";


import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";
import { useMediaQuery } from "#playback/hooks/useMediaQuery";

import DesktopPlayerBar from "./DesktopPlayerBar";
import MobilePlayerBar from "./MobilePlayerBar";

const PlayerBar = () => {
  const { track } = usePlayerTrack();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!track) return null;

  return isDesktop ? <DesktopPlayerBar /> : <MobilePlayerBar />;
};

export default PlayerBar;
