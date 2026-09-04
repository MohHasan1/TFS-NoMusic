"use client";

import { RiAlbumFill, RiDeleteBin2Line } from "@remixicon/react";
import { type MouseEvent, useState } from "react";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "#components/ui/alert-dialog";
import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { OFFLINE_ROUTES } from "#constants/routes";
import { cn } from "#lib/utils";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useLibrariesDownload } from "#offline/hooks";
import type { TLibraryOffline } from "#offline/types";
import { navigateOffline } from "#offline/utils/navigation";
import { usePlayerActions } from "#playback-player/hooks/usePlayerActions";
import { useQueueActions } from "#playback-queue/hooks/useQueueActions";

export function OfflineLibraryRemoveDialog({ library, className }: TProps) {
  const [isRemoved, setIsRemoved] = useState(false);

  const { remove, isPending } = useLibrariesDownload();
  const { getQueueSourceKey, clearQueue } = useQueueActions();
  const { clearPlayer } = usePlayerActions();

  const isRemoving = isPending(library.id);
  const sourceKey = OFFLINE_SOURCE_KEYS.LIBRARY_PAGE(library.id);

  if (isRemoved) return null;

  function preventDefault(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

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
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            aria-label={`Remove ${library.name} from offline downloads`}
            title={`Remove ${library.name} from offline downloads`}
            disabled={isRemoving}
            onClick={preventDefault}
            className={cn("rounded-full border-primary/40 bg-primary/20 text-primary-200", "shadow-md shadow-primary/20 ring-1 ring-white/5", "hover:border-primary/60 hover:bg-primary/30", className)}
          >
            {isRemoving ? <Spinner className="size-3" /> : <RiDeleteBin2Line className="size-3" />}
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiAlbumFill className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Remove "{library.name}" Library?</AlertDialogTitle>

          <AlertDialogDescription>This library will be removed from your device, but you can download it again later when you're online.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel size={"sm"} disabled={isRemoving}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction type="button" size={"sm"} disabled={isRemoving} variant="default" onClick={handleClick}>
            {isRemoving && <Spinner data-icon="inline-start" />}
            {isRemoving ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type TProps = {
  className?: string;
  library: TLibraryOffline;
};
