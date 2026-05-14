"use client";

import { RiMusic2Line } from "@remixicon/react";
import { useEffect } from "react";

import { NoMusicCard } from "@/components/private/no-music/sections/NoMusicCard";
import { useNoMusicPlayer } from "@/features/nomusic/noMusicPlayer/hook.noMusicPlayer";
import { useNoMusicQueue } from "@/features/nomusic/noMusicQueue/hook.noMusicQueue";
import type { TNoMusic } from "@/types/nomusic";

type NoMusicBrowserProps = {
  noMusic: TNoMusic[];
};

export function NoMusicBrowser({ noMusic }: NoMusicBrowserProps) {
  const { currentTrack, playTrack } = useNoMusicPlayer();
  const { setQueue, setCurrentIndex } = useNoMusicQueue();

  useEffect(() => {
    setQueue(noMusic);
  }, [noMusic, setQueue]);

  if (noMusic.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-zinc-800 border-2 border-dashed py-20 text-zinc-500">
        <RiMusic2Line className="mb-4 h-12 w-12 opacity-20" />
        <p>No NoMusic available yet.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {noMusic.map((track, index) => (
        <NoMusicCard
          key={track.id}
          isActive={currentTrack?.id === track.id}
          noMusic={track}
          onSelect={() => {
            setCurrentIndex(index);
            playTrack(track);
          }}
        />
      ))}
    </section>
  );
}
