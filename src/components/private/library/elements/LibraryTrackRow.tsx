"use client";

import Image from "next/image";

import { getGradientFromText } from "#components/private/_utils/helpers";
import { formatPlaybackTime } from "#lib/helpers/playback";
import { usePlayerPlayback } from "#modules/player/hooks/usePlayerPlayback";
import type { TNoMusic } from "#types/nomusic";
import { cn } from "#lib/utils";

const isDev = process.env.NODE_ENV === "development";

export function LibraryTrackRow({ index, track }: TProps) {
  const gradient = getGradientFromText(`${track.name ?? ""}-${track.artist ?? ""}`);
  const { isActive } = usePlayerPlayback(track.id);

  return (
    <div
      data-library-audio-index={index}
      className={cn("grid cursor-pointer grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 rounded-3xl border border-transparent px-3 py-3 transition-colors md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4", isActive ? "bg-white/5" : "hover:bg-white/3")}
    >
      <span className="text-sm font-semibold tabular-nums text-white/72">{index + 1}</span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-card-secondary md:size-11">
          {track.coverImage ? <Image src={track.coverImage} alt={track.name} fill unoptimized={isDev} sizes="44px" className="object-cover" /> : <div className={`size-full bg-linear-to-br ${gradient}`} />}
        </div>

        <div className="min-w-0">
          <p className={cn("truncate text-sm font-semibold text-white/90 md:text-base", isActive && "text-primary-200")} title={track.name}>
            {track.name}
          </p>

          <p className="truncate text-xs text-white/50" title={track.artist || ""}>
            {track.artist || "-"}
          </p>
        </div>
      </div>

      <p className="hidden capitalize truncate text-sm text-white/45 md:block" title={track.language || ""}>
        {track.language || "-"}
      </p>

      <span className="text-right text-xs tabular-nums text-white/60 md:text-sm">{formatPlaybackTime(track.duration ?? 0)}</span>
    </div>
  );
}

type TProps = {
  index: number;
  track: TNoMusic;
};
