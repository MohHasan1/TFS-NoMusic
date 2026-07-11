"use client";

import { useEffect } from "react";

import { UserPrecacheService } from "#offline/services/user-precache";
import type { TUser } from "#types/user";

export function OfflineUserPrecache({ user }: TProps) {
  useEffect(() => {
    void UserPrecacheService.sync(user);
  }, [user]);

  return null;
}

type TProps = {
  user: TUser;
};
