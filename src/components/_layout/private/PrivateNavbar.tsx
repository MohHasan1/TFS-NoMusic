"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "#lib/utils";
import { privateNavItems } from "./links";
import LogoutButton from "./LogoutButton";
import { PRIVATE_ROUTES } from "#constants/routes";
import { BrandLogoLink } from "#components/shared/BrandLogoLink";
import { buttonVariants } from "#components/ui/button";

export function PrivateNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-border border-b bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-8">
        <div className="shrink-0">
          <BrandLogoLink link={PRIVATE_ROUTES.NOMUSIC} />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="flex min-w-0 max-w-full items-center gap-1 rounded-full border bg-card p-1">
            {privateNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
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
                </Link>
              );
            })}
          </div>

          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
