"use client";

import { RiArrowRightUpLine, RiMusic2Line, RiUser3Line } from "@remixicon/react";
import { getGradientFromText } from "#components/private/_utils/helpers";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineImage } from "#offline/components/shared/OfflineImage";
import { OfflineLink } from "#offline/components/shared/OfflineLink";
import type { TLibraryOffline } from "#offline/types";

export function OfflineLibCard({ library }: TProps) {
  const count = library.trackCount ? (library.trackCount > 50 ? 50 : library.trackCount) : 0;
  const trackLabel = `${count} NoMusic`;
  const libAuthor = library.author || "-";
  const gradient = getGradientFromText(library.name);

  return (
    <article>
      <OfflineLink href={OFFLINE_ROUTES.LIBRARY(library.id)} className="group block">
        <Card className="relative w-full overflow-hidden bg-card transition-all duration-300 hover:border-primary-400/50">
          <CardHeader className="relative block aspect-square overflow-hidden bg-muted p-0">
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/55 via-transparent to-transparent" />

            <div className="relative size-full overflow-hidden">
              <OfflineImage
                src={library.uploadedImageURL}
                alt={`${library.name} cover`}
                sizes="(min-width: 1280px) 282px, (min-width: 1040px) calc(33.64vw - 45px), calc(49.44vw - 26px)"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fallback={<div className={`size-full bg-linear-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`} />}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-300 backdrop-blur-md">
                <RiArrowRightUpLine className="size-3" />
                Library
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
            <h3 className="truncate text-xs font-semibold text-primary-200 md:text-sm" title={library.name}>
              {library.name}
            </h3>

            <div className="flex items-center justify-start gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiUser3Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{libAuthor}</span>
            </div>

            <div className="flex items-center justify-start gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiMusic2Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{trackLabel}</span>
            </div>
          </CardContent>
        </Card>
      </OfflineLink>
    </article>
  );
}

type TProps = {
  library: TLibraryOffline;
};
