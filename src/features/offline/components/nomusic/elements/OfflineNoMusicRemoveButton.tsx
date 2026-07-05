"use client";

import { toast } from "sonner";
import { useState, type MouseEvent } from "react";
import { RiCloseCircleLine } from "@remixicon/react";

import useDeleteAudio from "#playback/modules/hooks/useDeleteAudio";

import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useNomusicDownload } from "#offline/hooks";

import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import type { TNoMusic } from "#types/nomusic";
import { cn } from "#lib/utils";

export function OfflineNoMusicRemoveButton({ noMusic, className, onRemoved }: TProps) {
  const [isRemoved, setIsRemoved] = useState(false);

  const { deleteAudio } = useDeleteAudio(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE());
  const { remove, isPending } = useNomusicDownload();

  const isRemoving = isPending(noMusic.id);
  if (isRemoved) return null;

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) return;

    const result = await remove(noMusic.id);
    if (!result.isSuccess) {
      toast.error(`Couldn't remove “${noMusic.name}” from offline downloads.`);
      return;
    }

    deleteAudio(noMusic.id);

    setIsRemoved(true);
    onRemoved();
    toast.success(`Removed “${noMusic.name}” from offline downloads.`);
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
