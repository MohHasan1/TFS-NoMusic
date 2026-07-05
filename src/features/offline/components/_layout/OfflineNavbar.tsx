"use client";

import { useSearchParams } from "next/navigation";

import { buttonVariants } from "#components/ui/button";
import { OfflineLink } from "#features/offline/components/shared/OfflineLink";
import { cn } from "#lib/utils";
import { offlineHomeHref, offlineNavItems } from "./links";
import { BackOnlineBanner } from "../shared/OfflineOnlineButton";

export function OfflineNavbar() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-8">
        <div className="shrink-0">
          <OfflineLink
            href={offlineHomeHref}
            className="group font-semibold uppercase transition-colors duration-300"
          >
            <span className="text-white/80 group-hover:text-white/60">No</span>
            <span className="bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary-400/80 group-hover:to-primary-600/80">
              Music
            </span>
          </OfflineLink>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <BackOnlineBanner />

          <div className="flex min-w-0 max-w-full items-center gap-1 rounded-full border bg-card p-1">
            {offlineNavItems.map((item) => {
              const isActive = item.matchViews.some((matchView) => matchView === view);
              const Icon = item.icon;

              return (
                <OfflineLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      className: "text-primary-200",
                      variant: isActive ? "secondary" : "ghost",
                      size: "xs",
                    }),
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden md:block">{item.label}</span>
                </OfflineLink>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
