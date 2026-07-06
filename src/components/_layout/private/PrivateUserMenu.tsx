"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { OfflineModeMenuButton } from "./OfflineModeMenuButton";
import { LogoutMenuDialog } from "./LogoutMenuDialog";
import { LogoutMenuButton } from "./LogoutMenuButton";
import { ProfileMenuButton } from "./ProfileMenuButton";

export function PrivateUserMenu({ userEmail, userName, userAvatarUrl }: TProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const initials = getInitials(userName);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="default" size="icon-lg" className="rounded-full p-5.5">
              <Avatar size="lg">
                {userAvatarUrl ? <AvatarImage src={userAvatarUrl} alt={userName} /> : null}
                <AvatarFallback
                  className={"bg-primary text-primary-foreground hover:bg-primary/80"}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-60 bg-card-secondary">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-2 py-2">
              <div className="flex items-center gap-2">
                <Avatar size="lg">
                  {userAvatarUrl ? <AvatarImage src={userAvatarUrl} alt={userName} /> : null}
                  <AvatarFallback
                    className={"bg-primary text-primary-foreground hover:bg-primary/80"}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary-200 uppercase">{userName}</p>
                  <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className={"bg-primary-600"}/>

          <DropdownMenuGroup>
            <ProfileMenuButton />
            <OfflineModeMenuButton />
          </DropdownMenuGroup>

          <DropdownMenuSeparator className={"bg-primary-600"}/>

          <DropdownMenuGroup>
            <LogoutMenuButton onOpen={() => setIsLogoutOpen(true)} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutMenuDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen} />
    </>
  );
}

type TProps = {
  userAvatarUrl?: string | null;
  userEmail: string;
  userName: string;
};

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
}
