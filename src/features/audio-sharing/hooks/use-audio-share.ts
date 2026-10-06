"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { TNoMusic } from "#types/nomusic";
import { getAudioShareUrl } from "../utils/get-audio-share-url";

export function useAudioShare(audio: TNoMusic) {
  const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);
  const url = getAudioShareUrl(audio.id);
  const shareData = useMemo(() => {
    const artist = audio.artist || "Unknown artist";

    return {
      title: `${audio.name} — ${artist}`,
      text: `Listen to “${audio.name}” by ${artist} on NoMusic.`,
      url,
    } satisfies ShareData;
  }, [audio.artist, audio.name, url]);

  useEffect(() => {
    setIsNativeShareSupported(canShareNatively(shareData));
  }, [shareData]);

  const shareAudio = useCallback(async () => {
    if (!canShareNatively(shareData)) return;

    try {
      await navigator.share(shareData);
    } catch (error) {
      if (isShareCancelled(error)) return;

      toast.error("Couldn't share this track.");
    }
  }, [shareData]);

  const copyAudioLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied.");
    } catch {
      toast.error("Couldn't copy the share link.");
    }
  }, [url]);

  return { copyAudioLink, isNativeShareSupported, shareAudio };
}

function canShareNatively(data: ShareData) {
  if (typeof navigator.share !== "function") return false;

  return typeof navigator.canShare !== "function" || navigator.canShare(data);
}

function isShareCancelled(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
