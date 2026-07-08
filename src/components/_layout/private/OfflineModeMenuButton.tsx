"use client";

import { RiWifiOffLine } from "@remixicon/react";
import { useRouter } from "nextjs-toploader/app";

import { DropdownMenuItem } from "#components/ui/dropdown-menu";
import { OFFLINE_ROUTES } from "#constants/routes";

export function OfflineModeMenuButton() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        router.push(OFFLINE_ROUTES.HOME);
      }}
      className="cursor-pointer text-primary-200"
    >
      <RiWifiOffLine className="size-3.5" data-icon="inline-start" />
      Offline mode
    </DropdownMenuItem>
  );
}
