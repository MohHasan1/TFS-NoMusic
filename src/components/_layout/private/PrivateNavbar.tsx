"use client";

import { RiLogoutBoxRLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "#server-actions/auth/logout";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { privateNavItems } from "./links";
import { PRIVATE_ROUTES } from "#constants/routes";

export function PrivateNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href={PRIVATE_ROUTES.NOMUSIC}
          className="group font-semibold uppercase transition-colors duration-300"
        >
          <span className="text-white/80 group-hover:text-white/60">No</span>
          <span
            className="bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent 
          group-hover:from-primary-400/80 group-hover:to-primary-600/80 transition-all duration-300"
          >
            Music
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 sm:flex">
            {privateNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "secondary" : "ghost",
                      size: "sm",
                    }),
                    "rounded-full",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <form action={logoutAction}>
            <Button type="submit" variant="destructive" size="sm" className="rounded-full">
              <RiLogoutBoxRLine className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
}
