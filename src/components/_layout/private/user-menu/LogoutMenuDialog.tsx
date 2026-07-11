"use client";

import { RiLogoutBoxRLine } from "@remixicon/react";
import { useCallback, useTransition } from "react";

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
} from "#components/ui/alert-dialog";
import { Spinner } from "#components/ui/spinner";
import { useOfflineUserCleanup } from "#offline/hooks/useOfflineUserCleanup";
import { usePlaybackCleanup } from "#playback/hooks/usePlaybackCleanup";
import { logoutAction } from "#server-actions/auth/logout";

export function LogoutMenuDialog({ open, onOpenChange }: TProps) {
  const { cleanupPlayback } = usePlaybackCleanup();
  const { cleanupOfflineUser } = useOfflineUserCleanup();
  const [isPending, startTransition] = useTransition();

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      cleanupPlayback();
      await cleanupOfflineUser();
      await logoutAction();
    });
  }, [cleanupPlayback, cleanupOfflineUser]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        size="sm"
        className={
          "border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]"
        }
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiLogoutBoxRLine className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            The server cat will close your session and take you back to sign-in.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" size="sm" disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            type="button"
            size="sm"
            disabled={isPending}
            variant="default"
            onClick={handleLogout}
          >
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "See ya..." : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
