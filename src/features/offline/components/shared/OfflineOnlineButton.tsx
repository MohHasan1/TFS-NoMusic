"use client";

import { useRouter } from "next/navigation";
import { RiLoader4Line, RiWifiLine, RiWifiOffLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { useReliableOnlineStatus } from "#offline/hooks/useOnlineStatus";

export function BackOnlineBanner() {
  const router = useRouter();
  const { isOnline, isChecking } = useReliableOnlineStatus();

  const StatusIcon = isChecking ? RiLoader4Line : isOnline ? RiWifiLine : RiWifiOffLine;

  return (
    <Button
      type="button"
      size="sm"
      variant={isChecking ? "outline" : "default"}
      disabled={!isOnline}
      onClick={() => {
        router.push("/");
      }}
      title={isOnline ? "Return to the online app" : "Reconnect to go back online"}
    >
      <StatusIcon className={isChecking ? "size-3 animate-spin" : "size-3"} aria-hidden="true" />
    </Button>
  );
}
