"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "#components/ui/button";
import { cn } from "#lib/utils";
import { privateNavItems } from "./links";

export function PrivateNavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden min-w-0 max-w-full items-center gap-1 rounded-full border bg-card p-1 md:flex">
      {privateNavItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
