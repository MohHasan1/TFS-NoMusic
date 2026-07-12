"use client";

import { RiDeleteBin2Line } from "@remixicon/react";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";

import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { OFFLINE_ROUTES } from "#constants/routes";
import { cn } from "#lib/utils";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { navigateOffline } from "#offline/utils/navigation";
import { useLibrariesDownload } from "#offline/hooks";
import type { TLibraryOffline } from "#offline/types";

import { usePlayerActions } from "#playback-player/hooks/usePlayerActions";
import { useQueueActions } from "#playback-queue/hooks/useQueueActions";

export function OfflineLibraryRemoveButton({ library, className }: TProps) {
  const [isRemoved, setIsRemoved] = useState(false);

  const { remove, isPending } = useLibrariesDownload();
  const { getQueueSourceKey, clearQueue } = useQueueActions();
  const { clearPlayer } = usePlayerActions();

  const isRemoving = isPending(library.id);
  const sourceKey = OFFLINE_SOURCE_KEYS.LIBRARY_PAGE(library.id);

  if (isRemoved) return null;

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) return;

    const result = await remove(library.id);

    if (!result.isSuccess) {
      toast.error(`Couldn't remove “${library.name}” from offline downloads.`);
      return;
    }

    if (sourceKey === getQueueSourceKey()) {
      clearPlayer();
      clearQueue();
    }

    setIsRemoved(true);
    navigateOffline(OFFLINE_ROUTES.LIBRARIES);

    toast.success(`Removed “${library.name}” from offline downloads.`);
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      aria-label={`Remove ${library.name} from offline downloads`}
      title={`Remove ${library.name} from offline downloads`}
      disabled={isRemoving}
      onClick={handleClick}
      data-ph-capture-attribute-action="library_removed_offline"
      data-ph-capture-attribute-library-id={library.id}
      data-ph-capture-attribute-library-name={library.name}
      className={cn(
        "rounded-full border-primary/40 bg-primary/20 text-primary-200",
        "shadow-md shadow-primary/20 ring-1 ring-white/5",
        "hover:border-primary/60 hover:bg-primary/30",
        className,
      )}
    >
      {isRemoving ? <Spinner className="size-3" /> : <RiDeleteBin2Line className="size-3" />}
    </Button>
  );
}

type TProps = {
  className?: string;
  library: TLibraryOffline;
};
