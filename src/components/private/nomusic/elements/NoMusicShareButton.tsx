"use client";

import { RiLink, RiShareForwardLine } from "@remixicon/react";
import { Button } from "#components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import { useAudioShare } from "#features/audio-sharing/hooks/use-audio-share";
import { cn } from "#lib/utils";
import type { TNoMusic } from "#types/nomusic";

export function NoMusicShareButton({ noMusic, className }: TProps) {
  const { copyAudioLink, isNativeShareSupported, shareAudio } = useAudioShare(noMusic);

  function stopCardPlayback(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async function handleShare(event: React.MouseEvent) {
    event.stopPropagation();
    await shareAudio();
  }

  async function handleCopyLink(event: React.MouseEvent) {
    event.stopPropagation();
    await copyAudioLink();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={`Share ${noMusic.name}`}
            title={`Share ${noMusic.name}`}
            onClick={stopCardPlayback}
            className={cn("size-full items-end justify-start rounded-tr-full p-2.5 md:p-2", "border-primary/40 bg-primary/20 text-primary-200", "shadow-md shadow-primary/20 ring-1 ring-white/5", "hover:border-primary/60 hover:bg-primary/30", className)}
          >
            <RiShareForwardLine className="size-2.5 md:size-3" />
          </Button>
        }
      />

      <DropdownMenuContent side="top" align="start" className="w-48 bg-card-secondary">
        <DropdownMenuItem disabled={!isNativeShareSupported} onClick={handleShare} className="cursor-pointer text-primary-200">
          <RiShareForwardLine />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer text-primary-200">
          <RiLink />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TProps = {
  noMusic: TNoMusic;
  className?: string;
};
