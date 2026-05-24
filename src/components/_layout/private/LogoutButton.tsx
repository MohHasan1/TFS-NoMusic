"use client";

import { useCallback } from "react";
import { redirect } from "next/navigation";
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
import { useLogoutCleanup } from "#modules/hooks/useLogoutCleanup";
import { logoutAction } from "#server-actions/auth/logout";
import { PUBLIC_ROUTES } from "#constants/routes";

const LogoutButton = () => {
  const { cleanupBeforeLogout } = useLogoutCleanup();

  const handleLogout = useCallback(async () => {
    cleanupBeforeLogout();
    await logoutAction();
    redirect(PUBLIC_ROUTES.SIGNIN);
  }, [cleanupBeforeLogout]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button type="button" variant="destructive" size="icon" aria-label="Log out" />}
      >
        <RiLogoutBoxRLine className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <RiLogoutBoxRLine className="size-7" />
          </AlertDialogMedia>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current session will end and you will be redirected to the sign-in page.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction type="button" variant="destructive" onClick={handleLogout}>
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
