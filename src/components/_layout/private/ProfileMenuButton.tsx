"use client";

import { RiUserLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "#components/ui/dropdown-menu";
import { PRIVATE_ROUTES } from "#constants/routes";

export function ProfileMenuButton() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        router.push(PRIVATE_ROUTES.PROFILE);
      }}
      className="cursor-pointer text-primary-200"
    >
      <RiUserLine className="size-3.5" data-icon="inline-start" />
      Profile
    </DropdownMenuItem>
  );
}
