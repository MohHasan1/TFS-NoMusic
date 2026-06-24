import Image from "next/image";

import { cn } from "#lib/utils";
import type { TLibraryTrack } from "../constants/libraryDetails";

const isDev = process.env.NODE_ENV === "development";

export function LibraryTrackRow({ index, track }: TProps) {
  return (
    <div
      className={cn(
        "grid cursor-pointer grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 rounded-3xl border border-transparent px-3 py-3 transition-colors md:grid-cols-[40px_minmax(0,1fr)_minmax(120px,180px)_56px] md:gap-4 md:px-4",
        index === 0 ? "bg-white/5" : "hover:bg-white/3",
      )}
    >
      <span className="text-sm font-semibold tabular-nums text-white/72">{index + 1}</span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-card-secondary md:size-11">
          <Image
            src={track.image}
            alt={track.title}
            fill
            unoptimized={isDev}
            sizes="44px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-semibold text-white/90 md:text-base",
              index === 0 && "text-primary-200",
            )}
            title={track.title}
          >
            {track.title}
          </p>

          <p className="truncate text-xs text-white/50 md:hidden" title={track.artist}>
            {track.artist}
          </p>
        </div>
      </div>

      <p className="hidden truncate text-sm text-white/55 md:block" title={track.artist}>
        {track.artist}
      </p>

      <span className="text-right text-xs tabular-nums text-white/60 md:text-sm">{track.duration}</span>
    </div>
  );
}

type TProps = {
  index: number;
  track: TLibraryTrack;
};
