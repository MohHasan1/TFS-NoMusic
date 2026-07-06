"use client";

import type { MouseEvent } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";

import { DropdownMenuItem } from "#components/ui/dropdown-menu";

export function LogoutMenuButton({ onOpen }: TProps) {
  return (
    <DropdownMenuItem
      variant="default"
      onSelect={(event) => {
        event.preventDefault();
        onOpen();
      }}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onOpen();
      }}
      className="cursor-pointer text-primary-400! hover:bg-primary/85! focus:bg-primary/85! focus:text-primary-foreground! data-highlighted:bg-primary/85! data-highlighted:text-primary-foreground!"
    >
      <RiLogoutBoxRLine className="size-3.5" data-icon="inline-start" />
      Log out
    </DropdownMenuItem>
  );
}

type TProps = {
  onOpen: () => void;
};
