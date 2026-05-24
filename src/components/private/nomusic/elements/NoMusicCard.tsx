"use client";

import { RiGlobalLine, RiPlayFill, RiUser3Line } from "@remixicon/react";
import Image from "next/image";
import { formatPlaybackTime } from "#components/private/common/utils/formatPlaybackTime";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import { cn } from "#lib/utils";
import type { TNoMusic } from "#types/nomusic";
import { usePlayerPlayback } from "@/modules/player/hooks/usePlayerPlayback";
import { PlayingBars } from "./PlayingBars";
import { NoMusicCover } from "./NoMusicCover";

export function NoMusicCard({ noMusic, onSelectFn }: TProps) {
  const { isActive, isPlaying } = usePlayerPlayback(noMusic.id);

  function handleClick() {
    onSelectFn(noMusic.id);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      aria-label={`Play ${noMusic.title}`}
      className="group h-auto cursor-pointer rounded-2xl p-0 text-left hover:bg-transparent"
    >
      <Card
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border bg-card transition-all duration-300",
          isActive
            ? "border-primary ring-2 ring-primary/40"
            : "border-border group-hover:border-muted-foreground/40",
        )}
      >
        <CardHeader className="relative aspect-square overflow-hidden bg-muted p-0">
          {noMusic.coverImage ? (
            <Image
              src={noMusic.coverImage}
              alt={noMusic.name || "No Music cover Image"}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <NoMusicCover name={noMusic.name} artist={noMusic.artist} coverTheme={"midnight"} />
          )}

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
              isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
            )}
          >
            <div className="border size-10 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-2xl md:group-hover:bg-primary">
              {isPlaying ? <PlayingBars /> : <RiPlayFill className="size-4 fill-current" />}
            </div>
          </div>

          <span className="absolute bg-card-secondary right-2 bottom-2 rounded-md px-1.5 py-0.5 text-[10px] tabular-nums">
            {formatPlaybackTime(noMusic.duration ?? 0)}
          </span>
        </CardHeader>

        <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
          <h3
            className="truncate text-[13px] font-semibold text-card-foreground md:text-sm"
            title={noMusic.name}
          >
            {noMusic.name ?? "Untitled"}
          </h3>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
            <RiUser3Line className="size-3 shrink-0" />
            <span className="truncate">{noMusic.artist || "Unknown Artist"}</span>
          </div>

          <div className="flex items-center gap-1.5 pt-1 text-[9px] font-bold tracking-wider text-muted-foreground uppercase md:text-[10px]">
            <RiGlobalLine className="size-3 shrink-0" />
            {noMusic.language ?? "unknown"}
          </div>
        </CardContent>
      </Card>
    </Button>
  );
}

type TProps = {
  noMusic: TNoMusic;
  onSelectFn: (id: TNoMusic["id"]) => void;
};
