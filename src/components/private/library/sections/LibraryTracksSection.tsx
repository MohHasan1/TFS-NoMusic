import type { TLibraryTrack } from "../constants/libraryDetails";
import { LibraryTrackRow } from "../elements/LibraryTrackRow";

export function LibraryTracksSection({ tracks }: TProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(120px,180px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Artist</span>
          <span className="text-right">Time</span>
        </div>

        <div className="space-y-1.5">
          {tracks.map((track, index) => (
            <LibraryTrackRow key={`${track.title}-${track.artist}`} index={index} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}

type TProps = {
  tracks: readonly TLibraryTrack[];
};
