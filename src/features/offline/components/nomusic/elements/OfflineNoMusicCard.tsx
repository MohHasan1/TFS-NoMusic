"use client";

import { RiGlobalLine, RiPlayFill, RiUser3Line } from "@remixicon/react";
import { memo } from "react";

import { formatPlaybackTime } from "#components/private/_utils/helpers";
import { NoMusicCover } from "#components/private/nomusic/elements/NoMusicCover";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import { OfflineCachedImage } from "#features/offline/components/shared/OfflineCachedImage";
import { cn } from "#lib/utils";
import { usePlayerPlayback } from "#modules/player/hooks/usePlayerPlayback";
import type { TNoMusic } from "#types/nomusic";

const OfflineNoMusicCardComponent = ({ index, noMusic }: TProps) => {
  const { isActive } = usePlayerPlayback(noMusic.id);

  return (
    <Button
      type="button"
      data-nomusic-index={index}
      data-nomusic-id={noMusic.id}
      variant="ghost"
      aria-label={`Play ${noMusic.name}`}
      className="group h-auto cursor-pointer p-0 text-left"
    >
      <Card
        className={cn(
          "relative w-full overflow-hidden bg-card transition-all duration-300",
          isActive
            ? "border-primary ring-1 ring-primary-400/40"
            : "border group-hover:border-primary-400/50",
        )}
      >
        <CardHeader className="relative aspect-square overflow-hidden bg-muted p-0">
          <OfflineCachedImage
            src={noMusic.coverImage}
            alt={noMusic.name || "NoMusic cover image"}
            sizes="(min-width: 1280px) 282px, (min-width: 1040px) calc(33.64vw - 45px), calc(49.44vw - 26px)"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallback={<NoMusicCover name={noMusic.name} artist={noMusic.artist} />}
          />

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-card-secondary/60 transition-opacity",
              isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
            )}
          >
            <div className="flex size-10 items-center justify-center rounded-full border bg-primary/80 text-primary-foreground md:group-hover:bg-primary">
              <RiPlayFill className="size-4 fill-current" />
            </div>
          </div>
          <span className="absolute right-2 bottom-2 rounded-md bg-card-secondary/60 px-1.5 py-0.5 text-xs tabular-nums">
            {formatPlaybackTime(noMusic.duration ?? 0, "zero")}
          </span>
        </CardHeader>

        <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
          <h3
            className="truncate text-xs font-semibold text-primary-200 md:text-sm"
            title={noMusic.name}
          >
            {noMusic.name ?? "Untitled"}
          </h3>

          <div className="flex items-center justify-start gap-2 text-[10px] text-muted-foreground md:text-xs">
            <RiUser3Line className="size-3 shrink-0 text-primary-400" />
            <span className="truncate">{noMusic.artist || "Unknown Artist"}</span>
          </div>

          <div className="flex items-center justify-start gap-2 text-[10px] capitalize text-muted-foreground md:text-xs">
            <RiGlobalLine className="size-3 shrink-0 text-primary-400" />
            {noMusic.language ?? "unknown"}
          </div>
        </CardContent>
      </Card>
    </Button>
  );
};

export const OfflineNoMusicCard = memo(OfflineNoMusicCardComponent);

type TProps = {
  index: number;
  noMusic: TNoMusic;
};
