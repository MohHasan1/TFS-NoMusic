"use client";

import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useNomusic } from "#offline/hooks";
import NoMusicEmptyBox from "../elements/NoMusicEmptyBox";
import { OfflineNoMusicCard } from "../elements/OfflineNoMusicCard";

export default function NoMusicContentSection() {
  const { nomusic } = useNomusic();
  // const { start } = useOfflineTrackPlayback(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE());

  return (
    <>
      {nomusic.length === 0 ? (
        <NoMusicEmptyBox />
      ) : (
        <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {nomusic.map((noMusic) => (
            <OfflineNoMusicCard
              key={noMusic.id}
              noMusic={noMusic}
            />
          ))}
        </section>
      )}
    </>
  );
}
