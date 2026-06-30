"use client";

import { OfflineNoMusicCard } from "../elements/OfflineNoMusicCard";
import NoMusicEmptyBox from "../elements/NoMusicEmptyBox";
import { useNomusic } from "#offline/hooks";

export default function NoMusicContentSection() {
  const { nomusic } = useNomusic();

  return (
    <>
      {nomusic.length === 0 ? (
        <NoMusicEmptyBox />
      ) : (
        <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {nomusic.map((noMusic) => (
            <OfflineNoMusicCard key={noMusic.id} noMusic={noMusic} />
          ))}
        </section>
      )}
    </>
  );
}
