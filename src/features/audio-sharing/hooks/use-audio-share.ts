"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { TNoMusic } from "#types/nomusic";
import { getAudioShareUrl } from "../utils/get-audio-share-url";

export function useAudioShare(audio: TNoMusic) {
  const shareAudio = useCallback(async () => {
    const url = getAudioShareUrl(audio.id);
    const artist = audio.artist || "Unknown artist";
    const shareData = {
      title: `${audio.name} — ${artist}`,
      text: `Listen to “${audio.name}” by ${artist} on NoMusic.`,
      url,
    };

    if (canShareNatively(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (isShareCancelled(error)) return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied.");
    } catch {
      toast.error("Couldn't share this track.");
    }
  }, [audio.artist, audio.id, audio.name]);

  return { shareAudio };
}

function canShareNatively(data: ShareData) {
  if (typeof navigator.share !== "function") return false;

  return typeof navigator.canShare !== "function" || navigator.canShare(data);
}

function isShareCancelled(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
