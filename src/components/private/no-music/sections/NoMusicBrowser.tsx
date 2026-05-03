"use client";

import { useState } from "react";
import { RiMusic2Line } from "@remixicon/react";

import { NoMusicCard } from "@/components/private/no-music/sections/NoMusicCard";
import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";

export function NoMusicBrowser({ noMusic }: NoMusicBrowserProps) {
  const [activeNoMusicId, setActiveNoMusicId] = useState<number | null>(
    noMusic[0]?.id ?? null,
  );

  const activeNoMusic =
    noMusic.find((item) => item.id === activeNoMusicId) || noMusic[0] || null;

  if (!noMusic.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-zinc-800 border-2 border-dashed py-20 text-zinc-500">
        <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
        <p>No NoMusic available yet.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {noMusic.map((item) => (
        <NoMusicCard
          key={item.id}
          isActive={activeNoMusic?.id === item.id}
          noMusic={item}
          onSelect={() => setActiveNoMusicId(item.id)}
        />
      ))}
    </section>
  );
}

type NoMusicBrowserProps = {
  noMusic: BrowsableNoMusicDTO[];
};
