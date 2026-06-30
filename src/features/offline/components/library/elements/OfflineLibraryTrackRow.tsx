import Image from "next/image";
import { formatPlaybackTime } from "#components/private/_utils/helpers";
import { NoMusicCover } from "#components/private/nomusic/elements/NoMusicCover";
import type { TNoMusic } from "#types/nomusic";

const isDev = process.env.NODE_ENV === "development";

export function OfflineLibraryTrackRow({ index, track }: TProps) {
  return (
    <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 rounded-3xl border border-transparent px-3 py-3 transition-colors hover:bg-white/3 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4">
      <span className="text-sm font-semibold tabular-nums text-white/72">{index + 1}</span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-card-secondary md:size-11">
          {track.coverImage ? <Image src={track.coverImage} alt={track.name} fill unoptimized={isDev} sizes="44px" className="object-cover" /> : <NoMusicCover name={track.name} artist={track.artist} />}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white/90 md:text-base" title={track.name}>
            {track.name}
          </p>

          <p className="truncate text-xs text-white/50" title={track.artist || ""}>
            {track.artist || "-"}
          </p>
        </div>
      </div>

      <p className="hidden truncate capitalize text-sm text-white/45 md:block" title={track.language || ""}>
        {track.language || "-"}
      </p>

      <span className="text-right text-xs tabular-nums text-white/60 md:text-sm">{formatPlaybackTime(track.duration ?? 0, "zero")}</span>
    </div>
  );
}

type TProps = {
  index: number;
  track: TNoMusic;
};
