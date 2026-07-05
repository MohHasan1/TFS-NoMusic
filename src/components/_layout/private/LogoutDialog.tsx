"use client";

import { useCallback, useTransition } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";

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
import { useLogoutCleanup } from "#playback/hooks/useLogoutCleanup";
import { logoutAction } from "#server-actions/auth/logout";
import { Spinner } from "#components/ui/spinner";

const LogoutDialog = () => {
  const { cleanupBeforeLogout } = useLogoutCleanup();
  const [isPending, startTransition] = useTransition();

  const handleLogout = useCallback(() => {
    cleanupBeforeLogout();

    startTransition(async () => {
      await logoutAction();
    });
  }, [cleanupBeforeLogout]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button type="button" variant="destructive" size="icon" aria-label="Log out" />}
      >
        <RiLogoutBoxRLine className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm" className={"border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]"}>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <RiLogoutBoxRLine className="size-7" />
          </AlertDialogMedia>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            The server cat will close your session and take you back to sign-in.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            type="button"
            disabled={isPending}
            variant="destructive"
            onClick={handleLogout}
          >
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "See ya..." : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
