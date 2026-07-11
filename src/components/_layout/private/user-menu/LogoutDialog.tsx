// NOT IN USE

"use client";

import { RiLogoutBoxRLine } from "@remixicon/react";
import { useCallback, useTransition } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "#components/ui/alert-dialog";
import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { useLogoutCleanup } from "#playback/hooks/useLogoutCleanup";
import { logoutAction } from "#server-actions/auth/logout";

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
        render={
          <Button type="button" size="icon" variant="default" aria-label="Log out" title="Log Out">
            <RiLogoutBoxRLine className="size-3.5" />
          </Button>
        }
      />

      <AlertDialogContent size="sm" className={"border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]"}>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiLogoutBoxRLine className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Log out?</AlertDialogTitle>
          <AlertDialogDescription>The server cat will close your session and take you back to sign-in.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" size="sm" disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction type="button" size="sm" disabled={isPending} variant="default" onClick={handleLogout}>
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "See ya..." : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
