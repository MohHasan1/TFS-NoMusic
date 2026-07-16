import { RiAlbumFill, RiArrowRightLine, RiMusic2Line } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineLink } from "#features/offline/components/shared/OfflineLink";

export default function OfflineHomeContentSection() {
  return (
    <section className="grid w-full grid-cols-2 gap-4">
      {offlineSections.map((section) => {
        const Icon = section.icon;

        return (
          <OfflineLink key={section.href} href={section.href} className="group rounded-2xl border border-border/70 bg-card/70 p-4 text-left backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-card md:rounded-3xl md:p-6">
            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:justify-between md:gap-4 md:text-left">
              <div className="flex min-w-0 flex-col items-center gap-2 md:flex-1 md:items-stretch md:gap-0 md:space-y-3">
                <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-400 md:size-11 md:rounded-2xl">
                    <Icon className="size-4 md:size-5" />
                  </div>

                  <h2 className="text-sm text-primary-200 font-semibold md:text-lg">{section.title}</h2>
                </div>

                <p className="hidden text-sm leading-relaxed text-primary-200/80 md:block">
                  {section.description}
                </p>
              </div>

              <RiArrowRightLine className="hidden size-4 shrink-0 text-primary-200 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground md:mt-1 md:block md:size-5" />
            </div>
          </OfflineLink>
        );
      })}
    </section>
  );
}

const offlineSections = [
  {
    title: "Collections",
    description: "Everything you've downloaded, ready to play without a connection.",
    href: OFFLINE_ROUTES.NOMUSIC,
    icon: RiMusic2Line,
  },
  {
    title: "Libraries",
    description: "Your downloaded libraries, saved to this device for offline listening.",
    href: OFFLINE_ROUTES.LIBRARIES,
    icon: RiAlbumFill,
  },
] as const;
