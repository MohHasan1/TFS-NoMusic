"use client";

import { usePathname } from "next/navigation";

import { buttonVariants } from "#components/ui/button";
import { cn } from "#lib/utils";
import { offlineHomeHref, offlineNavItems } from "./links";

export function OfflineNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-8">
        <div className="shrink-0">
          <a href={offlineHomeHref} className="group font-semibold uppercase transition-colors duration-300">
            <span className="text-white/80 group-hover:text-white/60">No</span>
            <span className="bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary-400/80 group-hover:to-primary-600/80">Music</span>
          </a>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="flex min-w-0 max-w-full items-center gap-1 rounded-full border bg-card p-1">
            {offlineNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "secondary" : "ghost",
                      size: "xs",
                    }),
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden md:block">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
