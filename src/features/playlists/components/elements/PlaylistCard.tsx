import { RiArrowRightUpLine, RiMusic2Line, RiUser3Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

import { getGradientFromText } from "#components/private/_utils/helpers";
import { Card, CardContent, CardHeader } from "#components/ui/card";

const isDev = process.env.NODE_ENV === "development";

export function PlaylistCard({ href, name, author, trackCount, imageURL }: TProps) {
  const count = trackCount ? (trackCount > 50 ? 50 : trackCount) : 0;
  const trackLabel = `${count} NoMusic`;
  const playlistAuthor = author || "-";
  const gradient = getGradientFromText(name);

  return (
    <article>
      <Link href={href} className="group block" data-ph-capture-attribute-action="playlist_pressed" data-ph-capture-attribute-playlist-name={name}>
        <Card className="relative w-full overflow-hidden bg-card transition-all duration-300 hover:border-primary-400/50">
          <CardHeader className="relative block aspect-square overflow-hidden bg-muted p-0">
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/55 via-transparent to-transparent" />

            <div className="relative size-full overflow-hidden">
              {imageURL ? (
                <Image src={imageURL} alt={`${name} cover`} fill unoptimized={isDev} sizes="(min-width: 1280px) 282px, (min-width: 1040px) calc(33.64vw - 45px), calc(49.44vw - 26px)" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className={`size-full bg-linear-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`} />
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-300 backdrop-blur-md">
                <RiArrowRightUpLine className="size-3" />
                Playlist
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
            <h3 className="truncate text-xs font-semibold text-primary-200 md:text-sm" title={name}>
              {name}
            </h3>

            <div className="flex items-center justify-start gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiUser3Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{playlistAuthor}</span>
            </div>

            <div className="flex items-center justify-start gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiMusic2Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{trackLabel}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}

type TProps = {
  href: string;
  name: string;
  author: string;
  trackCount?: number | null;
  imageURL?: string | null;
};
