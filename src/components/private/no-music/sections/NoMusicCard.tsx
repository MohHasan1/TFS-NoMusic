"use client";

import Image from "next/image";
import {
  RiGlobalLine,
  RiMusic2Line,
  RiPlayFill,
  RiUser3Line,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BrowsableTrack } from "@/services/noMusic/payload-tracks";

export function NoMusicCard({ isActive, onSelect, track }: NoMusicCardProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onSelect}
      className="group h-auto cursor-pointer rounded-2xl p-0 text-left hover:bg-transparent"
    >
      <Card
        className={`relative w-full overflow-hidden rounded-2xl transition-all duration-300 ${
          isActive
            ? "border-primary bg-accent ring-2 ring-primary/40"
            : "border-border bg-card group-hover:border-muted-foreground/40"
        }`}
      >
        <CardHeader className="relative aspect-square overflow-hidden bg-muted">
          {track.coverURL ? (
            <Image
              src={track.coverURL}
              alt={track.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <RiMusic2Line className="h-16 w-16 opacity-20" />
            </div>
          )}

          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
              isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-2xl transition-all md:group-hover:bg-primary">
              <RiPlayFill className="h-6 w-6 translate-x-0.5 fill-current" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 p-3 md:space-y-3 md:p-4">
          <div className="truncate pr-2 md:pr-4">
            <h3
              className="truncate pl-1 text-[11px] font-bold text-card-foreground md:text-sm"
              title={track.title}
            >
              {track.title}
            </h3>

            <div className="flex items-center gap-1 text-[9px] md:text-xs text-zinc-500 mt-1">
              <RiUser3Line className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span className="truncate">
                {track.artist || "Unknown Artist"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-border border-t pt-2 md:gap-3 md:pt-3">
            <div className="flex items-center gap-1 text-[8px] font-bold tracking-wider text-muted-foreground uppercase md:text-[10px]">
              <RiGlobalLine className="h-2.5 w-2.5 md:h-3 md:w-3" />
              {track.language || "Unknown"}
            </div>
            <span className="ml-auto text-[10px] text-muted-foreground">
              {"--:--"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Button>
  );
}

type NoMusicCardProps = {
  isActive: boolean;
  onSelect: () => void;
  track: BrowsableTrack;
};
