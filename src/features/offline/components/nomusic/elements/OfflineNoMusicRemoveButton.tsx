"use client";

import { RiCloseCircleLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { useNomusicDownload } from "#offline/hooks";
import { cn } from "#lib/utils";
import type { TNoMusic } from "#types/nomusic";

export function OfflineNoMusicRemoveButton({ noMusic, className, onRemoved }: TProps) {
  const { remove, isPending } = useNomusicDownload();
  const [isRemoved, setIsRemoved] = useState(false);

  const isRemoving = isPending(noMusic.id);

  if (isRemoved) return null;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) return;

    const result = await remove(noMusic.id);
    if (!result.isSuccess) {
      toast.error(`Couldn't remove “${noMusic.name}” from offline downloads.`);
      return;
    }

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
