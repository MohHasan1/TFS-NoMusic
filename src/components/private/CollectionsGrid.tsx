"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  RiGlobalLine,
  RiMusic2Line,
  RiPlayFill,
  RiUser3Line,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BrowsableTrack } from "@/services/tracks/payload-tracks";

type CollectionsGridProps = {
  tracks: BrowsableTrack[];
};

function formatDuration(seconds?: number) {
  if (!seconds || Number.isNaN(seconds)) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function CollectionsGrid({ tracks }: CollectionsGridProps) {
  const [activeTrackId, setActiveTrackId] = useState<number | null>(
    tracks[0]?.id ?? null,
  );
  const [shouldPlay, setShouldPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mediaList = useMemo(() => tracks, [tracks]);
  const activeTrack = mediaList.find((t) => t.id === activeTrackId) ?? mediaList[0] ?? null;

  useEffect(() => {
    if (!shouldPlay) return;

    audioRef.current?.play().catch(() => {
      setShouldPlay(false);
    });
  }, [activeTrackId, shouldPlay]);

  if (mediaList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-white/10 border-dashed py-20 text-white/45">
        <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
        <p>No tracks found in this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 pb-32 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {mediaList.map((track) => {
          const isCurrent = activeTrack?.id === track.id;

          return (
            <Button
              key={track.id}
              type="button"
              variant="ghost"
              onClick={() => {
                setActiveTrackId(track.id);
                setShouldPlay(true);
              }}
              className={`group relative h-auto cursor-pointer overflow-hidden rounded-2xl border bg-white/3 p-0 text-left text-white transition-all duration-300 hover:bg-white/5 hover:text-white `}
            >
              <div className="relative aspect-square overflow-hidden bg-white/3">
                {track.coverURL ? (
                  <img
                    src={track.coverURL}
                    alt={track.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/25">
                    <RiMusic2Line className="h-16 w-16 opacity-20" />
                  </div>
                )}

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                    isCurrent ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-2xl transition-all md:group-hover:bg-white">
                    <RiPlayFill className="h-6 w-6 translate-x-0.5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-3 md:space-y-3 md:p-4">
                <div className="truncate pr-2 md:pr-4">
                  <h3 className="truncate text-[11px] font-bold text-white md:text-sm" title={track.title}>
                    {track.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-[9px] text-white/50 md:text-xs">
                    <RiUser3Line className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    <span className="truncate">{track.artist || "Unknown Artist"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-white/10 pt-2 md:gap-3 md:pt-3">
                  <div className="flex items-center gap-1 text-[8px] font-bold tracking-wider text-white/45 uppercase md:text-[10px]">
                    <RiGlobalLine className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {track.language || "Unknown"}
                  </div>
                  <span className="ml-auto text-[10px] text-white/45">{formatDuration(track.duration)}</span>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {activeTrack ? (
        <div className="fixed right-4 bottom-4 left-4 z-50 rounded-2xl border border-white/10 bg-black/95 p-4 backdrop-blur-xl md:left-1/2 md:w-[440px] md:-translate-x-1/2">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{activeTrack.title}</p>
              <p className="truncate text-xs text-white/55">{activeTrack.artist || "Unknown Artist"}</p>
            </div>
            <Badge variant="outline" className="border-white/15 bg-white/3 text-white/60">
              {formatDuration(activeTrack.duration)}
            </Badge>
          </div>
          <audio
            ref={audioRef}
            key={activeTrack.id}
            src={activeTrack.streamURL}
            controls
            className="w-full"
            preload="metadata"
          />
        </div>
      ) : null}
    </>
  );
}
