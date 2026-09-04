"use client";

import { RiArrowDownSLine, RiArrowUpSLine, RiCloseLine } from "@remixicon/react";
import Image from "next/image";

import { getGradientFromText } from "#components/private/_utils/helpers";
import { Button } from "#components/ui/button";
import { formatPlaybackTime } from "#lib/helpers/playback";
import { cn } from "#lib/utils";
import { usePlayerPlayback } from "#playback-player/hooks/usePlayerPlayback";
import type { TNoMusic } from "#types/nomusic";

const isDev = process.env.NODE_ENV === "development";

export function PlaylistAudioRow({ index, track, reorder }: TProps) {
  const gradient = getGradientFromText(`${track.name ?? ""}-${track.artist ?? ""}`);
  const { isActive } = usePlayerPlayback(track.id);

  return (
    <div
      data-playlist-audio-index={index}
      data-ph-capture-attribute-action="playlist_audio_pressed"
      data-ph-capture-attribute-audio-id={track.id}
      data-ph-capture-attribute-audio-name={track.name}
      className={cn(
        "grid grid-cols-[22px_minmax(0,1fr)_28px_44px] items-center gap-3 rounded-3xl border border-transparent px-3 py-3 transition-colors md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_28px_56px] md:gap-4 md:px-4",
        reorder ? "bg-white/3" : cn("cursor-pointer", isActive ? "bg-white/5" : "hover:bg-white/3"),
      )}
    >
      <span className="text-xs  tabular-nums text-white/72">{index + 1}</span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-card-secondary md:size-11">
          {track.coverImage ? <Image src={track.coverImage} alt={track.name} fill unoptimized={isDev} sizes="44px" className="object-cover" /> : <div className={`size-full bg-linear-to-br ${gradient}`} />}
        </div>

        <div className="min-w-0">
          <p className={cn("truncate text-sm font-semibold text-primary-200/90 md:text-base", isActive && "text-primary-200")} title={track.name}>
            {track.name}
          </p>

          <p className="truncate text-xs text-white/50" title={track.artist || ""}>
            {track.artist || "-"}
          </p>
        </div>
      </div>

      <p className="hidden truncate text-center capitalize text-sm text-white/45 md:col-start-3 md:block" title={track.language || ""}>
        {track.language || "-"}
      </p>

      {reorder ? (
        <>
          <div className="col-start-3 flex justify-center md:col-start-4">
            <Button type="button" size="icon-xs" variant="ghost" disabled={reorder.disabled} onClick={reorder.onRemove} aria-label={`Remove ${track.name} from playlist`} className="text-primary-200/50 hover:text-destructive">
              <RiCloseLine />
            </Button>
          </div>

          <div className="col-start-4 flex flex-col items-end gap-0.5 md:col-start-5">
            <Button type="button" size="icon-xs" variant="outline" disabled={reorder.disabled || reorder.isFirst} onClick={reorder.onUp} aria-label={`Move ${track.name} up`}>
              <RiArrowUpSLine />
            </Button>
            <Button type="button" size="icon-xs" variant="outline" disabled={reorder.disabled || reorder.isLast} onClick={reorder.onDown} aria-label={`Move ${track.name} down`}>
              <RiArrowDownSLine />
            </Button>
          </div>
        </>
      ) : (
        <span className="col-start-4 text-right text-xs tabular-nums text-white/60 md:col-start-5 md:text-sm">{formatPlaybackTime(track.duration ?? 0)}</span>
      )}
    </div>
  );
}

type TReorderControls = {
  disabled?: boolean;
  isFirst: boolean;
  isLast: boolean;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
};

type TProps = {
  index: number;
  track: TNoMusic;
  reorder?: TReorderControls;
};
