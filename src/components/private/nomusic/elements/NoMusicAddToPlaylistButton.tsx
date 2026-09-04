"use client";

import { RiPlayListAddLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { usePlaylistAddDialog } from "#features/playlists/hooks/use-playlist-add-dialog";
import { cn } from "#lib/utils";
import type { TNoMusic } from "#types/nomusic";

export function NoMusicAddToPlaylistButton({ noMusic, className }: TProps) {
  const { open } = usePlaylistAddDialog();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    open(noMusic.id);
  }

  return (
    <Button
      type="button"
      size="icon-xs"
      variant="outline"
      aria-label={`Add ${noMusic.name} to a playlist`}
      title="Add to playlist"
      onClick={handleClick}
      data-ph-capture-attribute-action="audio_add_to_playlist"
      data-ph-capture-attribute-audio-id={noMusic.id}
      data-ph-capture-attribute-audio-name={noMusic.name}
      className={cn("rounded-bl-full size-full items-start justify-end p-2.5 md:p-2", "border-primary/40 bg-primary/20 text-primary-200", "shadow-md shadow-primary/20 ring-1 ring-white/5", "hover:border-primary/60 hover:bg-primary/30", className)}
    >
      <RiPlayListAddLine className="size-2.5 md:size-3" />
    </Button>
  );
}

type TProps = {
  noMusic: TNoMusic;
  className?: string;
};
