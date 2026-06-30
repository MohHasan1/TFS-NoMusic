"use client";

import { OfflineLibraryAudioEmptyBox } from "../elements/OfflineLibraryAudioEmptyBox";
import { OfflineLibraryTrackRow } from "../elements/OfflineLibraryTrackRow";
import { useNomusicByLibId } from "#offline/hooks";

export function OfflineLibraryAudioSection({ libId }: TProps) {
  const { nomusic } = useNomusicByLibId(libId);
  const tracks = nomusic;

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Language</span>
          <span className="text-right">Time</span>
        </div>

        {tracks.length === 0 ? (
          <OfflineLibraryAudioEmptyBox />
        ) : (
          <div className="space-y-1.5">
            {tracks.map((track, index) => (
              <OfflineLibraryTrackRow key={track.id} index={index} track={track} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type TProps = {
  libId: string;
};
