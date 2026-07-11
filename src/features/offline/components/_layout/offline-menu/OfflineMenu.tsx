"use client";

import { RiUser3Line } from "@remixicon/react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { useUser } from "#offline/hooks";
import { OfflineOnlineDialog } from "../../shared/OfflineOnlineDialog";

export function OfflineMenu() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="rounded-full p-5.5"
            aria-label="Open offline menu"
          >
            <Avatar size="lg">
              {user?.uploadedImageURL ? (
                <AvatarImage src={user.uploadedImageURL} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-primary-400/40 text-primary-200">
                {user ? getInitials(user.name) : <RiUser3Line className="size-4" />}
              </AvatarFallback>
              <AvatarBadge>
                <RiUser3Line />
              </AvatarBadge>
            </Avatar>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-60 bg-card-secondary">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-3">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                {user?.uploadedImageURL ? (
                  <AvatarImage src={user.uploadedImageURL} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-primary-400/40 text-primary-200">
                  {user ? getInitials(user.name) : <RiUser3Line className="size-4" />}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-primary-200">
                  {user?.name ?? "Offline mode"}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {user?.email ?? "Downloaded content"}
                </span>
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

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
}
