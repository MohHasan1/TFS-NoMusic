"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "#lib/utils";
import { OfflineLink } from "#offline/components/shared/OfflineLink";
import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { offlineNavItems } from "../navbar/links";

export function OfflineMobileBottomNav() {
  const searchParams = useSearchParams();
  const { isOpen } = usePlayerDialog();
  const view = searchParams.get("view");

  return (
    <nav
      aria-label="Offline navigation"
      className={cn("fixed inset-x-0 bottom-0 z-90 border-border/70 border-t bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl transition-transform duration-700 ease-in-out md:hidden", isOpen ? "translate-y-[calc(100%+env(safe-area-inset-bottom))]" : "translate-y-0")}
    >
      <div className="mx-auto grid items-start h-20 max-w-lg grid-cols-2 px-2">
        {offlineNavItems.map((item) => {
          const isActive = item.matchViews.some((matchView) => matchView === view);
          const Icon = item.icon;

          return (
            <OfflineLink
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn("relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 pt-4 text-[10px] font-medium transition-colors", isActive ? "text-primary-400" : "text-primary-200 hover:text-primary-200/75")}
            >
              <span className={cn("absolute top-1 h-0.5 w-7 rounded-full bg-transparent transition-colors", isActive && "bg-primary-400 shadow-[0_0_12px_var(--color-primary-400)]")} />
              <Icon className={cn("size-5", isActive && "drop-shadow-[0_0_8px_currentColor]")} />
              <span className="max-w-full truncate">{item.label}</span>
            </OfflineLink>
          );
        })}
      </div>
    </nav>
  );
}
