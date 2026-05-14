import type { RepeatMode } from "@/features/nomusic/noMusicQueue/engine.noMusicQueue";

export const REPEAT_LABEL: Record<RepeatMode, string> = {
  off: "Repeat off",
  all: "Repeat all",
  one: "Repeat one",
};

export const NEXT_REPEAT_LABEL: Record<RepeatMode, string> = {
  off: "Enable repeat all",
  all: "Enable repeat one",
  one: "Disable repeat",
};

/**
 * Cycles repeat modes in the common music-player order:
 * loop the queue, loop the current track, then turn repeat off.
 */
export function nextRepeatMode(mode: RepeatMode): RepeatMode {
  if (mode === "off") return "all";
  if (mode === "all") return "one";
  return "off";
}
