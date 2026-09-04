"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { privateNavItems } from "../navbar/links";
import { cn } from "#lib/utils";

export function PrivateMobileBottomNav() {
  const pathname = usePathname();
  const { isOpen } = usePlayerDialog();

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-90 border-border/70 border-t bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl transition-transform duration-700 ease-in-out md:hidden",
        isOpen ? "translate-y-[calc(100%+env(safe-area-inset-bottom))]" : "translate-y-0",
      )}
    >
      <div className="mx-auto grid items-start h-20 max-w-lg grid-cols-4 px-2">
        {privateNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 pt-4 text-[10px] font-medium transition-colors",
                isActive ? "text-primary-400" : "text-primary-200 hover:text-primary-200/75",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-0.5 w-7 rounded-full bg-transparent transition-colors",
                  isActive && "bg-primary-400 shadow-[0_0_12px_var(--color-primary-400)]",
                )}
              />
              <Icon className={cn("size-5", isActive && "drop-shadow-[0_0_8px_currentColor]")} />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
