"use client";

import { formatPlaybackTime } from "#lib/helpers/playback";
import { cn } from "#lib/utils";
import { usePlayerPlayback } from "#modules/player/hooks/usePlayerPlayback";
import { OfflineImage } from "#offline/components/shared/OfflineImage";
import { OfflineNoMusicCover } from "#offline/components/shared/OfflineNoMusicCover";
import type { TNoMusic } from "#types/nomusic";

export function OfflineLibraryTrackRow({ index, track }: TProps) {
  const { isActive } = usePlayerPlayback(track.id);

  return (
    <button
      type="button"
      data-library-audio-index={index}
      aria-label={`Play ${track.name}`}
      className={cn(
        "grid w-full cursor-pointer grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 rounded-3xl border border-transparent px-3 py-3 text-left transition-colors md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4",
        isActive ? "bg-white/5" : "hover:bg-white/3",
      )}
    >
      <span className="text-sm font-semibold tabular-nums text-white/72">{index + 1}</span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-card-secondary md:size-11">
          <OfflineImage src={track.coverImage} alt={track.name} sizes="44px" className="object-cover" fallback={<OfflineNoMusicCover name={track.name} artist={track.artist} />} />
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

      <p className="hidden truncate capitalize text-sm text-white/45 md:block" title={track.language || ""}>
        {track.language || "-"}
      </p>

      <span className="text-right text-xs tabular-nums text-white/60 md:text-sm">{formatPlaybackTime(track.duration ?? 0, "zero")}</span>
    </button>
  );
}

type TProps = {
  index: number;
  track: TNoMusic;
};
