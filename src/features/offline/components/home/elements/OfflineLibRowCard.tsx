"use client";

import { RiArrowRightSLine, RiMusic2Line } from "@remixicon/react";
import { getGradientFromText } from "#components/private/_utils/helpers";
import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineImage } from "#offline/components/shared/OfflineImage";
import { OfflineLink } from "#offline/components/shared/OfflineLink";
import type { TLibraryOffline } from "#offline/types";
import { capitalizeFirstLetter } from "#lib/utils";

export function OfflineLibRowCard({ library }: TProps) {
  const count = library.trackCount ? (library.trackCount > 50 ? 50 : library.trackCount) : 0;
  const trackLabel = `${count} NoMusic`;
  const gradient = getGradientFromText(library.name);

  return (
    <OfflineLink
      href={OFFLINE_ROUTES.LIBRARY(library.id)}
      className="group flex items-center gap-4 rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-card md:gap-5 md:p-5"
      data-ph-capture-attribute-action="library_pressed_offline"
      data-ph-capture-attribute-library-id={library.id}
      data-ph-capture-attribute-library-name={library.name}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted md:size-24">
        <OfflineImage
          src={library.uploadedImageURL}
          alt={`${library.name} cover`}
          className="object-cover"
          fallback={<div className={`size-full bg-linear-to-br ${gradient}`} />}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          {capitalizeFirstLetter(library.type)}
        </span>

        <h3
          className="truncate text-base font-bold text-primary-200 md:text-lg"
          title={library.name}
        >
          {library.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RiMusic2Line className="size-3.5 shrink-0 text-primary-400" />
          <span className="truncate">{trackLabel}</span>
        </div>
      </div>

      <RiArrowRightSLine className="size-6 shrink-0 text-primary-200 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
    </OfflineLink>
  );
}

type TProps = {
  library: TLibraryOffline;
};
