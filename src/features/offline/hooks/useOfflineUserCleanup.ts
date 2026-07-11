"use client";

import { useCallback } from "react";

import { UserPrecacheService } from "#offline/services/user-precache";

export function useOfflineUserCleanup() {
  const cleanupOfflineUser = useCallback(() => UserPrecacheService.clear(), []);

  return { cleanupOfflineUser };
}
