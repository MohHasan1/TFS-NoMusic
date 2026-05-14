"use client";

import { RiGlobalLine, RiMusic2Line, RiPlayFill, RiUser3Line } from "@remixicon/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TNoMusic } from "@/types/nomusic";

import { formatPlaybackTime } from "../utils/formatPlaybackTime";

type NoMusicCardProps = {
  noMusic: TNoMusic;
  isActive: boolean;
  onSelect: (id: TNoMusic["id"]) => void;
};

export function NoMusicCard({ noMusic, isActive, onSelect }: NoMusicCardProps) {
  const hasDuration = typeof noMusic.duration === "number" && noMusic.duration > 0;

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(noMusic.id)}
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
              alt={noMusic.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <RiMusic2Line className="h-16 w-16 opacity-20" />
            </div>
          )}

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
              isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-2xl md:group-hover:bg-primary">
              <RiPlayFill className="h-6 w-6 translate-x-0.5 fill-current" />
            </div>
          </div>

          {hasDuration ? (
            <span className="absolute right-2 bottom-2 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white shadow-sm">
              {formatPlaybackTime(noMusic.duration ?? 0)}
            </span>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
          <h3
            className="truncate text-[13px] font-semibold text-card-foreground md:text-sm"
            title={noMusic.title}
          >
            {noMusic.title}
          </h3>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
            <RiUser3Line className="size-3 shrink-0" />
            <span className="truncate">{noMusic.artist || "Unknown Artist"}</span>
          </div>

          {noMusic.language ? (
            <div className="flex items-center gap-1.5 pt-1 text-[9px] font-bold tracking-wider text-muted-foreground uppercase md:text-[10px]">
              <RiGlobalLine className="size-3 shrink-0" />
              {noMusic.language}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Button>
  );
}
