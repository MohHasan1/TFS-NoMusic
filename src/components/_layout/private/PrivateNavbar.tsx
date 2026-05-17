"use client";

import { RiLogoutBoxRLine, RiMusic2Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "#server-actions/auth/logout";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { privateHomeHref, privateNavItems } from "./links";

export function PrivateNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href={privateHomeHref}
          className="flex items-center gap-2 font-semibold text-foreground tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-primary">
            <RiMusic2Line className="size-4" />
          </span>
          <span>NoMusic</span>
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
