"use client";

import { RiCloseLargeFill, RiMusic2Line } from "@remixicon/react";
import { type MouseEvent, useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "#components/ui/alert-dialog";
import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { cn } from "#lib/utils";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useNomusicDownload } from "#offline/hooks";
import useDeleteAudio from "#playback/hooks/useDeleteAudio";
import type { TNoMusic } from "#types/nomusic";

const OfflineAudioRemoveDialog = ({ noMusic, className, onRemoved }: TProps) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const { deleteAudio } = useDeleteAudio(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE());
  const { remove, isPending } = useNomusicDownload();

  const isRemoving = isPending(noMusic.id);
  if (isRemoved) return null;

  function preventDefault(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

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
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            size="icon-xs"
            variant="outline"
            aria-label={`Remove ${noMusic.name} from offline downloads`}
            title={`Remove ${noMusic.name} from offline downloads`}
            disabled={isRemoving}
            onClick={preventDefault}
            className={cn("h-full w-full items-start justify-start rounded-br-full p-2.5 md:p-2", "border-primary/40 bg-primary/20 text-primary-200", "shadow-md shadow-primary/20 ring-1 ring-white/5", "hover:border-primary/60 hover:bg-primary/30", className)}
          >
            {isRemoving ? <Spinner className="size-3" /> : <RiCloseLargeFill className="size-2.5 font-extrabold md:size-3" />}
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiMusic2Line className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Remove "{noMusic.name}"?</AlertDialogTitle>

          <AlertDialogDescription>This audio will be removed from your device. You can download it again anytime when you're online.</AlertDialogDescription>
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
};

export default OfflineAudioRemoveDialog;

type TProps = {
  noMusic: TNoMusic;
  className?: string;
  onRemoved: () => void;
};
