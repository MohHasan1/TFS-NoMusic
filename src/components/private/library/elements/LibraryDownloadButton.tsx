"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { RiCheckLine, RiDownload2Line } from "@remixicon/react";

import { OfflineLibraries } from "#offline/repositories/libraries";
import { useLibrariesDownload } from "#offline/hooks";
import { Spinner } from "#components/ui/spinner";
import type { TLibrary } from "#types/library";
import { Button } from "#components/ui/button";
import type { TNoMusic } from "#types/nomusic";
import { cn } from "#lib/utils";

export function LibraryDownloadButton({
  library,
  tracks,
  className,
  showIsDownloaded = false,
}: TProps) {
  const { download, isPending } = useLibrariesDownload();
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function syncDownloadedState() {
      const result = await OfflineLibraries.isDownloaded(library.id);
      if (!isMounted || !result.isSuccess) return;

      setIsDownloaded(result.data);
    }

    void syncDownloadedState();

    return () => {
      isMounted = false;
    };
  }, [library.id]);

  const isDownloading = isPending(library.id);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isDownloading || tracks.length === 0) return;

    const result = await download(library, tracks);
    if (!result.isSuccess) {
      toast.error(`Couldn't save “${library.name}” for offline listening.`);
      return;
    }

    setIsDownloaded(true);
    toast.success(`“${library.name}” is now available offline.`);
  }

  if (showIsDownloaded && isDownloaded) return null;

  return (
    <Button
      type="button"
      size="icon-sm"
      variant={isDownloaded ? "secondary" : "outline"}
      aria-label={isDownloaded ? `${library.name} downloaded` : `Download ${library.name}`}
      title={
        isDownloaded ? `${library.name} saved offline` : `Download ${library.name} for offline`
      }
      disabled={isDownloading || isDownloaded || tracks.length === 0}
      onClick={handleClick}
      data-ph-capture-attribute-action="library_downloaded"
      data-ph-capture-attribute-library-id={library.id}
      data-ph-capture-attribute-library-name={library.name}
      className={cn(
        "rounded-full border-primary/40 bg-primary/20 text-primary-200",
        "ring-1 ring-primary/5",
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
  library: TLibrary;
  tracks: TNoMusic[];
  className?: string;
  showIsDownloaded?: boolean;
};
