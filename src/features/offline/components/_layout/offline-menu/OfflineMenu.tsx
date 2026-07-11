"use client";

import { RiWifiOffLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import { OfflineOnlineDialog } from "../../shared/OfflineOnlineDialog";

export function OfflineMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button type="button" variant="default" size="icon-lg" className="rounded-full" aria-label="Open offline menu">
            <RiWifiOffLine className="size-5" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-60 bg-card-secondary">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <RiWifiOffLine className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-primary-200">Offline mode</span>
                <span className="block truncate text-xs text-muted-foreground">Downloaded content</span>
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-primary-600" />

        <DropdownMenuGroup>
          <OfflineOnlineDialog trigger="menu-item" />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
