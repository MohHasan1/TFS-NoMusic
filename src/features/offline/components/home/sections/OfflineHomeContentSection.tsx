import { RiAlbumFill, RiArrowRightLine, RiMusic2Line } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineLink } from "#features/offline/components/shared/OfflineLink";

export default function OfflineHomeContentSection() {
  return (
    <section className="mx-auto grid w-full max-w-4xl gap-4 md:grid-cols-2">
      {offlineSections.map((section) => {
        const Icon = section.icon;

        return (
          <OfflineLink key={section.href} href={section.href} className="group rounded-3xl border border-border/70 bg-card/70 p-6 text-left backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary-400">
                  <Icon className="size-5" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{section.description}</p>
                </div>
              </div>

              <RiArrowRightLine className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          </OfflineLink>
        );
      })}
    </section>
  );
}

const offlineSections = [
  {
    title: "NoMusic Collections",
    description: "Browse saved songs in the same collection-style grid as the client view.",
    href: OFFLINE_ROUTES.NOMUSIC,
    icon: RiMusic2Line,
  },
  {
    title: "NoMusic Libraries",
    description: "Open saved libraries and move into each library page from this device.",
    href: OFFLINE_ROUTES.LIBRARIES,
    icon: RiAlbumFill,
  },
] as const;
