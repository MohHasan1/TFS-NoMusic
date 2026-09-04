import { RiMusic2Line, RiUser3Line } from "@remixicon/react";

import type { TPlaylistDetail } from "../../types/playlist";
import { PlaylistCover } from "../elements/PlaylistCover";

export function PlaylistHeroSection({ playlist }: TProps) {
  const count = playlist.trackCount ? (playlist.trackCount > 50 ? 50 : playlist.trackCount) : 0;
  const trackLabel = `${count} NoMusic`;

  return (
    <section className="relative">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <PlaylistCover src={playlist.coverImage} alt={`${playlist.name} cover`} name={playlist.name} />

        <div className="space-y-4 lg:space-y-5 space-x-4">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl lg:text-5xl">{playlist.name}</h1>

            <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{playlist.description || "Playlist collection."}</p>
          </div>

          <div className="flex justify-between items-center max-w-2xl">
            <div className="space-x-4 ">
              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <RiMusic2Line className="size-4 shrink-0 text-primary-400" />
                <span className="font-medium">{trackLabel}</span>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <RiUser3Line className="size-4 shrink-0 text-primary-400" />
                <span className="font-medium">{playlist.author || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type TProps = {
  playlist: TPlaylistDetail;
};
