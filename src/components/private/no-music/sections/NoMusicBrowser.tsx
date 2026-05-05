"use client";

import { RiMusic2Line } from "@remixicon/react";

import { NoMusicCard } from "@/components/private/no-music/sections/NoMusicCard";
import { useNoMusicPlayer } from "@/features/noMusicPlayer/hoook.noMusicPlayer";
import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";

export function NoMusicBrowser({ noMusic }: NoMusicBrowserProps) {
  const { currentTrack, playTrack } = useNoMusicPlayer();

  // const queue = useMemo(
  //   () =>
  //     noMusic.map((item) => ({
  //       id: item.id,
  //       title: item.title,
  //       streamUrl: item.streamURL,
  //       artist: item.artist,
  //       coverImage: item.coverURL,
  //     })),
  //   [noMusic],
  // );

  // useEffect(() => {
  //   setQueue(queue);
  // }, [queue, setQueue]);

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
      {noMusic.map((track) => (
        <NoMusicCard
          key={track.id}
          isActive={currentTrack?.id === track.id}
          noMusic={track}
          onSelect={() => {
            const nextTrack = {
              id: track.id,
              title: track.title,
              streamUrl: track.streamURL,
              artist: track.artist,
              coverImage: track.coverURL,
            };

            playTrack(nextTrack);
          }}
        />
      ))}
    </section>
  );
}

type NoMusicBrowserProps = {
  noMusic: BrowsableNoMusicDTO[];
};
