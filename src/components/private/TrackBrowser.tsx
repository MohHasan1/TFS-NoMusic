"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  RiFilter3Line,
  RiGlobalLine,
  RiMusic2Line,
  RiPlayFill,
  RiSearchLine,
  RiUser3Line,
} from "@remixicon/react";

import type { BrowsableTrack } from "@/services/tracks/payload-tracks";

type TrackBrowserProps = {
  tracks: BrowsableTrack[];
};

function formatDuration(seconds?: number) {
  if (!seconds || Number.isNaN(seconds)) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function TrackBrowser({ tracks }: TrackBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [activeTrackId, setActiveTrackId] = useState<number | null>(
    tracks[0]?.id ?? null,
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchQuery =
        !searchQuery ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (track.artist || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchLanguage =
        !selectedLanguage ||
        (track.language || "").toLowerCase() === selectedLanguage.toLowerCase();

      return matchQuery && matchLanguage;
    });
  }, [tracks, searchQuery, selectedLanguage]);

  const activeTrack =
    filteredTracks.find((track) => track.id === activeTrackId) ||
    filteredTracks[0] ||
    null;

  if (!tracks.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-zinc-800 border-2 border-dashed py-20 text-zinc-500">
        <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
        <p>No tracks available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight text-white">
            <RiMusic2Line className="h-10 w-10 text-indigo-500" />
            No Music Collection
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Browse and play your private catalog. Press "/" to jump to search.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="group relative">
            <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-indigo-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search tracks, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
            />
          </div>

          <div className="relative">
            <RiFilter3Line className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pr-8 pl-10 text-sm text-zinc-400 transition-all hover:text-white focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
            >
              <option value="">All Languages</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bangla">Bangla</option>
              <option value="arabic">Arabic</option>
              <option value="other">Others</option>
            </select>
          </div>
        </div>
      </header>

      {filteredTracks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-zinc-800 border-2 border-dashed py-20 text-zinc-500">
          <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
          <p>No tracks found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-44 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTracks.map((track) => {
            const isCurrent = activeTrack?.id === track.id;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrackId(track.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-zinc-900/40 text-left transition-all duration-300 ${
                  isCurrent
                    ? "border-indigo-500/50 ring-2 ring-indigo-500/50"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-800">
                  {track.coverURL ? (
                    <img
                      src={track.coverURL}
                      alt={track.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-700">
                      <RiMusic2Line className="h-16 w-16 opacity-20" />
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                      isCurrent ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/80 text-white shadow-2xl transition-all md:group-hover:bg-indigo-600">
                      <RiPlayFill className="h-6 w-6 translate-x-0.5 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-3 md:space-y-3 md:p-4">
                  <div className="truncate pr-2 md:pr-4">
                    <h3
                      className="truncate text-[11px] font-bold text-white md:text-sm"
                      title={track.title}
                    >
                      {track.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[9px] text-zinc-500 md:text-xs">
                      <RiUser3Line className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      <span className="truncate">
                        {track.artist || "Unknown Artist"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-zinc-800/50 border-t pt-2 md:gap-3 md:pt-3">
                    <div className="flex items-center gap-1 text-[8px] font-bold tracking-wider text-zinc-500 uppercase md:text-[10px]">
                      <RiGlobalLine className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      {track.language || "Unknown"}
                    </div>
                    <span className="ml-auto text-[10px] text-zinc-500">
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {activeTrack ? (
        <div className="fixed right-4 bottom-4 left-4 z-50 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-xl md:left-auto md:w-[440px]">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {activeTrack.title}
              </p>
              <p className="truncate text-xs text-zinc-400">
                {activeTrack.artist || "Unknown Artist"}
              </p>
            </div>
            <span className="text-xs text-zinc-500">
              {formatDuration(activeTrack.duration)}
            </span>
          </div>
          <audio
            key={activeTrack.id}
            src={activeTrack.streamURL}
            controls
            className="w-full"
            preload="metadata"
          />
        </div>
      ) : null}
    </div>
  );
}
