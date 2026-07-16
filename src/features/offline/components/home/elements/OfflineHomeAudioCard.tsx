"use client";

import { RiPlayFill } from "@remixicon/react";
import { memo, useState } from "react";

import { formatPlaybackTime } from "#lib/helpers/playback";
import { OfflineImage } from "#offline/components/shared/OfflineImage";
import { OfflineNoMusicCover } from "../../shared/OfflineNoMusicCover";
import { OfflinePlayingBars } from "../../nomusic/elements/OfflinePlayingBars";
import OfflineAudioRemoveDialog from "../../nomusic/elements/OfflineAudioRemoveDialog";
import { Card, CardHeader } from "#components/ui/card";
import type { TNoMusic } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { cn } from "#lib/utils";
import { usePlayerPlayback } from "#playback-player/hooks/usePlayerPlayback";

const OfflineHomeAudioCardComponent = ({ index, noMusic }: TProps) => {
  const { isActive, isPlaying } = usePlayerPlayback(noMusic?.id);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      render={<div />}
      nativeButton={false}
      data-nomusic-index={index}
      data-nomusic-id={noMusic?.id}
      variant="ghost"
      aria-label={`Play ${noMusic?.name}`}
      className="group h-auto w-full cursor-pointer p-0 text-left hover:bg-transparent dark:hover:bg-transparent"
      data-ph-capture-attribute-action="audio_pressed_offline"
      data-ph-capture-attribute-audio-id={noMusic?.id}
      data-ph-capture-attribute-audio-name={noMusic?.name}
    >
      <div className="w-full space-y-2">
        <Card
          className={cn(
            "relative aspect-square w-full overflow-hidden bg-card transition-all duration-300",
            isActive
              ? "border-primary ring-1 ring-primary-400/40"
              : "border group-hover:border-primary-400/50",
          )}
        >
          <CardHeader className="relative size-full overflow-hidden bg-muted p-0">
            <OfflineImage
              src={noMusic?.coverImage}
              alt={noMusic?.name || "NoMusic cover Image"}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              fallback={<OfflineNoMusicCover name={noMusic?.name} artist={noMusic?.artist} />}
            />

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-card-secondary/60 transition-opacity",
                isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
              )}
            >
              <div className="border size-10 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground md:group-hover:bg-primary">
                {isPlaying ? (
                  <OfflinePlayingBars />
                ) : (
                  <RiPlayFill className="size-4 fill-current" />
                )}
              </div>
            </div>

            <div className="absolute left-0 top-0 z-20 flex h-full w-full max-h-10 max-w-10 items-start justify-start rounded-br-full bg-card-secondary p-0">
              <OfflineAudioRemoveDialog
                noMusic={noMusic}
                onRemoved={() => setIsVisible(false)}
                className="hover:border-primary/60 hover:bg-primary/30"
              />
            </div>

            <span className="absolute bg-card-secondary/60 text-primary-200 right-2 bottom-2 rounded-md px-1.5 py-0.5 text-xs tabular-nums">
              {formatPlaybackTime(noMusic?.duration ?? 0)}
            </span>
          </CardHeader>
        </Card>

        <div className="space-y-0.5 px-0.5">
          <h3
            className="truncate text-xs font-semibold text-primary-200 md:text-sm"
            title={noMusic?.name}
          >
            {noMusic?.name ?? "Untitled"}
          </h3>

          <p className="truncate text-[10px] text-primary-200/80 md:text-xs">
            {noMusic?.artist || "Unknown Artist"}
          </p>
        </div>
      </div>
    </Button>
  );
};

export const OfflineHomeAudioCard = memo(OfflineHomeAudioCardComponent);

type TProps = {
  index: number;
  noMusic: TNoMusic;
};
