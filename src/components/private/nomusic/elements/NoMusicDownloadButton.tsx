"use client";

import { RiCheckLine, RiDownload2Line } from "@remixicon/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { OfflineNomusic } from "#offline/repositories/nomusic";
import { useNomusicDownload } from "#offline/hooks";
import { Spinner } from "#components/ui/spinner";
import { Button } from "#components/ui/button";
import type { TNoMusic } from "#types/nomusic";
import { cn } from "#lib/utils";

export function NoMusicDownloadButton({ noMusic, className, showIsDownloaded = false }: TProps) {
  const { download, isPending } = useNomusicDownload();
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function syncDownloadedState() {
      const result = await OfflineNomusic.isDownloaded(noMusic.id);
      if (!isMounted || !result.isSuccess) return;

      setIsDownloaded(result.data);
    }

    void syncDownloadedState();

    return () => {
      isMounted = false;
    };
  }, [noMusic.id]);

  const isDownloading = isPending(noMusic.id);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isDownloading || isDownloaded) return;

    const result = await download(noMusic);
    if (!result.isSuccess) {
     toast.error(`Couldn’t save “${noMusic.name}” for offline listening.`);
      return;
    }

    setIsDownloaded(true);
toast.success(`“${noMusic.name}” is now available offline.`);
  }

  if (showIsDownloaded && isDownloaded) return null;

  return (
    <Button
      type="button"
      size="icon-sm"
      variant={isDownloaded ? "secondary" : "outline"}
      aria-label={isDownloaded ? `${noMusic.name} downloaded` : `Download ${noMusic.name}`}
      title={
        isDownloaded ? `${noMusic.name} saved offline` : `Downloade ${noMusic.name} for offline`
      }
      disabled={isDownloading || isDownloaded}
      onClick={handleClick}
      className={cn(
        "rounded-full border-primary/40 bg-primary/20 text-primary-200",
        "shadow-md shadow-primary/20 ring-1 ring-white/5",
        "hover:border-primary/60 hover:bg-primary/30",
        className,
      )}
    >
      {isDownloading ? (
        <Spinner className="size-3" />
      ) : isDownloaded ? (
        <RiCheckLine className="size-3" />
      ) : (
        <RiDownload2Line className="size-3 font-extrabold" />
      )}
    </Button>
  );
}

type TProps = {
  noMusic: TNoMusic;
  className?: string;
  showIsDownloaded?: boolean;
};
