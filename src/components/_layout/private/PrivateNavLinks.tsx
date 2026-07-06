"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "#components/ui/button";
import { privateNavItems } from "./links";
import { cn } from "#lib/utils";

export function PrivateNavLinks() {
  const pathname = usePathname();

  return (
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
                className: "text-primary-200",
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
  );
}
