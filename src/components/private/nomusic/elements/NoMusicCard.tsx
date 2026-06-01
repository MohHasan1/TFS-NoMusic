"use client";

import { memo } from "react";
import Image from "next/image";
import { RiGlobalLine, RiPlayFill, RiSparkling2Fill, RiUser3Line } from "@remixicon/react";

import { cn } from "#lib/utils";
import { PlayingBars } from "./PlayingBars";
import { NoMusicCover } from "./NoMusicCover";
import type { TNoMusic } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import { usePlayerPlayback } from "#modules/player/hooks/usePlayerPlayback";
import {
  formatPlaybackTime,
  isNewByUpdatedDate,
} from "#components/private/common/utils";

const NoMusicCardComponent = ({ index, noMusic }: TProps) => {
  const { isActive, isPlaying } = usePlayerPlayback(noMusic.id);
  const isNew = isNewByUpdatedDate(noMusic.uploadedAt);

  return (
    <Button
      type="button"
      data-nomusic-index={index}
      data-nomusic-id={noMusic.id}
      variant="ghost"
      aria-label={`Play ${noMusic.title}`}
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
          {noMusic.coverImage ? (
            <Image
              src={noMusic.coverImage}
              alt={noMusic.name || "NoMusic cover Image"}
              fill
              unoptimized
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 50vw, (max-width: 1536px) 501px, 555px"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <NoMusicCover name={noMusic.name} artist={noMusic.artist} />
          )}

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-card-secondary/60 transition-opacity",
              isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
            )}
          >
            <div className="border size-10 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground md:group-hover:bg-primary">
              {isPlaying ? <PlayingBars /> : <RiPlayFill className="size-4 fill-current" />}
            </div>
          </div>

          {true && (
            <div className="absolute right-2 top-2 z-20">
              <span className="flex items-center gap-1 rounded-md bg-primary/60 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-primary-foreground">
                <RiSparkling2Fill className="size-2 text-yellow-400" />
                New
              </span>
            </div>
          )}

          <span className="absolute bg-card-secondary/60 right-2 bottom-2 rounded-md px-1.5 py-0.5 text-xs tabular-nums">
            {formatPlaybackTime(noMusic.duration ?? 0)}
          </span>
        </CardHeader>

        <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
          <h3
            className="truncate text-xs md:text-sm font-semibold text-primary-200"
            title={noMusic.name}
          >
            {noMusic.name ?? "Untitled"}
          </h3>

          <div className="flex items-center justify-start gap-2 text-[10px] md:text-xs text-muted-foreground">
            <RiUser3Line className="size-3 shrink-0 text-primary-400" />
            <span className="truncate">{noMusic.artist || "Unknown Artist"}</span>
          </div>

          <div className="flex items-center justify-start gap-2 text-[10px] md:text-xs text-muted-foreground capitalize">
            <RiGlobalLine className="size-3 shrink-0 text-primary-400" />
            {noMusic.language ?? "unknown"}
          </div>
        </CardContent>
      </Card>
    </Button>
  );
};

export const NoMusicCard = memo(NoMusicCardComponent);

type TProps = {
  index: number;
  noMusic: TNoMusic;
};
