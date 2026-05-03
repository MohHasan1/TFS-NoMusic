"use client";

import { useState } from "react";
import { RiMusic2Line } from "@remixicon/react";

import { NoMusicCard } from "@/components/private/no-music/sections/NoMusicCard";
import type { BrowsableTrack } from "@/services/noMusic/payload-tracks";

export function NoMusicBrowser({ tracks }: NoMusicBrowserProps) {
  const [activeTrackId, setActiveTrackId] = useState<number | null>(
    tracks[0]?.id ?? null,
  );

  const activeTrack =
    tracks.find((track) => track.id === activeTrackId) || tracks[0] || null;

  if (!tracks.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-zinc-800 border-2 border-dashed py-20 text-zinc-500">
        <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
        <p>No NoMusic available yet.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {tracks.map((track) => (
        <NoMusicCard
          key={track.id}
          isActive={activeTrack?.id === track.id}
          track={track}
          onSelect={() => setActiveTrackId(track.id)}
        />
      ))}
    </section>
  );
}

type NoMusicBrowserProps = {
  tracks: BrowsableTrack[];
};
