"use client";

import { RiCheckLine, RiMusic2Line } from "@remixicon/react";
import Image from "next/image";

import { getGradientFromText } from "#components/private/_utils/helpers";
import { Spinner } from "#components/ui/spinner";
import { cn } from "#lib/utils";
import type { TPlaylist } from "../../types/playlist";

const isDev = process.env.NODE_ENV === "development";

export function PlaylistAddList({ playlists, isLoading, containingIds, togglingId, onToggle }: TProps) {
  return (
    <div className="-mx-2 max-h-72 overflow-y-scroll px-2 scrollbar-thin [scrollbar-color:var(--color-primary-400)_transparent] [&::-webkit-scrollbar-thumb:hover]:bg-primary-200/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-200/25 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner className="size-5" />
        </div>
      ) : playlists.length === 0 ? (
        <p className="py-8 text-center text-sm text-primary-200/60">You have no playlists yet.</p>
      ) : (
        <ul className="space-y-1">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <Row playlist={playlist} isIn={containingIds.has(playlist.id)} isToggling={togglingId === playlist.id} onToggle={() => onToggle(playlist.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({ playlist, isIn, isToggling, onToggle }: TRowProps) {
  return (
    <button type="button" disabled={isToggling} onClick={onToggle} className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-primary-200/5 disabled:opacity-60">
      <Thumb name={playlist.name} src={playlist.coverImage} />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{playlist.name}</span>
        <span className="block text-xs text-primary-200/55">
          {playlist.trackCount ?? 0} {playlist.trackCount === 1 ? "track" : "tracks"}
        </span>
      </span>

      <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border", isIn ? "border-primary-400 bg-primary/30 text-primary-200" : "border-primary-200/25 text-transparent")}>{isToggling ? <Spinner className="size-3" /> : <RiCheckLine className="size-3.5" />}</span>
    </button>
  );
}

function Thumb({ name, src }: { name: string; src: string | null | undefined }) {
  return (
    <span className="relative block size-10 shrink-0 overflow-hidden rounded-lg border border-primary-200/10 bg-card-secondary">
      {src ? (
        <Image src={src} alt="" fill unoptimized={isDev} sizes="40px" className="object-cover" />
      ) : (
        <span className={cn("flex size-full items-center justify-center bg-linear-to-br text-primary-200/50", getGradientFromText(name))}>
          <RiMusic2Line className="size-4" />
        </span>
      )}
    </span>
  );
}

type TProps = {
  playlists: TPlaylist[];
  isLoading: boolean;
  containingIds: Set<string>;
  togglingId: string | null;
  onToggle: (playlistId: string) => void;
};

type TRowProps = {
  playlist: TPlaylist;
  isIn: boolean;
  isToggling: boolean;
  onToggle: () => void;
};
