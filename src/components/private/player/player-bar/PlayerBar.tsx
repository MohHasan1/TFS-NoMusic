"use client";

import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";
import DesktopPlayerBar from "./DesktopPlayerBar";
import MobilePlayerBar from "./MobilePlayerBar";

const PlayerBar = () => {
  const { track } = usePlayerTrack();
  if (!track) return null;

  return (
    <>
      <DesktopPlayerBar />
      <MobilePlayerBar />
    </>
  );
};

export default PlayerBar;
