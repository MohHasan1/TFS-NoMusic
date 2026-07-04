"use client";

import { RiCloseCircleLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { useNomusic, useNomusicDownload } from "#offline/hooks";
import { cn } from "#lib/utils";
import type { TNoMusic } from "#types/nomusic";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useQueueActions } from "#playback-queue/hooks/useQueueActions";
import { useRegistryActions } from "#playback-registry/hooks/useRegistryActions";
import { useTrackPlayback } from "#playback/modules/hooks/useTrackPlayback";


export function OfflineNoMusicRemoveButton({ noMusic, className, onRemoved }: TProps) {
  const [isRemoved, setIsRemoved] = useState(false);
  const { remove, isPending } = useNomusicDownload();
  // TODO: THIS IS TEMP - OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE()) - use zuatnd store
  const { nomusic } = useNomusic();
  const { start } = useTrackPlayback(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE());

  const { setQueue, getCurrentTrackId, getNextTrackId, getPreviousTrackId } = useQueueActions();
  const { getTrackById } = useRegistryActions();

  const isRemoving = isPending(noMusic.id);

  if (isRemoved) return null;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) return;

    const currentTrackId = getCurrentTrackId();
    const isCurrentTrack = currentTrackId === noMusic.id;
    const replacementTrackId = isCurrentTrack
      ? (getNextTrackId() ?? getPreviousTrackId())
      : currentTrackId;

    const result = await remove(noMusic.id);
    if (!result.isSuccess) {
      toast.error(`Couldn't remove “${noMusic.name}” from offline downloads.`);
      return;
    }

    const remainingNomusic = nomusic.filter((item) => item.id !== noMusic.id);
    setIsRemoved(true);
    onRemoved();
    toast.success(`Removed “${noMusic.name}” from offline downloads.`);

    // Stop and clear the player here.
    if (remainingNomusic.length === 0) {
      return;
    }
    if (!replacementTrackId) return;

    const trackToPlay = getTrackById(replacementTrackId);
    if (!trackToPlay) return;
    
    /*
     * Deleted the playing song:
     * rebuild queue and play next/previous.
     */
    if (isCurrentTrack) {
      start(remainingNomusic, trackToPlay, true);
      return;
    }

    /*
     * Deleted another song:
     * rebuild queue without restarting playback.
     */
    setQueue(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE(), remainingNomusic, currentTrackId!, true);
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      aria-label={`Remove ${noMusic.name} from offline downloads`}
      title={`Remove ${noMusic.name} from offline downloads`}
      disabled={isRemoving}
      onClick={handleClick}
      className={cn(
        "rounded-full border-primary/40 bg-primary/20 text-primary-200",
        "shadow-md shadow-primary/20 ring-1 ring-white/5",
        "hover:border-primary/60 hover:bg-primary/30",
        className,
      )}
    >
      {isRemoving ? <Spinner className="size-4" /> : <RiCloseCircleLine className="size-4" />}
    </Button>
  );
}

type TProps = {
  noMusic: TNoMusic;
  className?: string;
  onRemoved: () => void;
};

// async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
//   event.preventDefault();
//   event.stopPropagation();

//   if (isRemoving) return;

//   const result = await remove(noMusic.id);
//   if (!result.isSuccess) {
//     toast.error(`Couldn't remove “${noMusic.name}” from offline downloads.`);
//     return;
//   }

//   setIsRemoved(true);
//   onRemoved();
//   toast.success(`Removed “${noMusic.name}” from offline downloads.`);

//   navigateOffline(OFFLINE_ROUTES.NOMUSIC);
// }
