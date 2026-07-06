"use client";

import { useRouter } from "next/navigation";
import { RiLoader4Line, RiWifiLine, RiWifiOffLine } from "@remixicon/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#components/ui/alert-dialog";
import { Button } from "#components/ui/button";
import { useReliableOnlineStatus } from "#offline/hooks/useOnlineStatus";
import { PRIVATE_ROUTES } from "#constants/routes";

export function OfflineOnlineDialog() {
  const router = useRouter();
  const { isOnline, isChecking } = useReliableOnlineStatus();

  const StatusIcon = isChecking ? RiLoader4Line : isOnline ? RiWifiLine : RiWifiOffLine;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            size="icon-sm"
            variant={isChecking ? "outline" : "default"}
            disabled={!isOnline}
            title={isOnline ? "Return to the online app" : "Reconnect to go back online"}
          >
            <StatusIcon
              className={isChecking ? "size-3 animate-spin" : "size-3"}
              aria-hidden="true"
            />
          </Button>
        }
      />

      <AlertDialogContent
        size="sm"
        className={
          "border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]"
        }
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiWifiLine className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Go back online?</AlertDialogTitle>

          <AlertDialogDescription>
            You'll return to the online app, where you can enjoy the latest content and features.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" size="sm">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            type="button"
            size="sm"
            variant="default"
            onClick={() => {
              router.push(PRIVATE_ROUTES.NOMUSIC);
            }}
          >
            Go online
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
