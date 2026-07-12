"use client";

import { RiLoader4Line, RiWifiLine, RiWifiOffLine } from "@remixicon/react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "#components/ui/alert-dialog";
import { Button } from "#components/ui/button";
import { DropdownMenuItem } from "#components/ui/dropdown-menu";
import { Spinner } from "#components/ui/spinner";
import { PRIVATE_ROUTES } from "#constants/routes";
import { useReliableOnlineStatus } from "#offline/hooks/useOnlineStatus";

const ONLINE_COLLECTION_HREF = `${PRIVATE_ROUTES.NOMUSIC}?setPrefAudioLang=1`;

export function OfflineOnlineDialog({ trigger = "button" }: TProps) {
  const router = useRouter();
  const { isOnline, isChecking } = useReliableOnlineStatus();
  const [pending, startTransition] = useTransition();

  const StatusIcon = isChecking ? RiLoader4Line : isOnline ? RiWifiLine : RiWifiOffLine;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        nativeButton={trigger !== "menu-item"}
        render={
          trigger === "menu-item" ? (
            <DropdownMenuItem className="cursor-pointer text-primary-200" closeOnClick={false} disabled={!isOnline}>
              <StatusIcon className={isChecking ? "size-3.5 animate-spin" : "size-3.5"} data-icon="inline-start" />
              Go online
            </DropdownMenuItem>
          ) : (
            <Button type="button" size="icon-sm" variant={isChecking ? "outline" : "default"} disabled={!isOnline} title={isOnline ? "Return to the online app" : "Reconnect to go back online"}>
              <StatusIcon className={isChecking ? "size-3 animate-spin" : "size-3"} aria-hidden="true" />
            </Button>
          )
        }
      />

      <AlertDialogContent size="sm" className={"border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]"}>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/35 text-primary-400">
            <RiWifiLine className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-primary-200">Go back online?</AlertDialogTitle>

          <AlertDialogDescription>You'll return to the online app, where you can enjoy the latest content and features.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" size="sm" disabled={pending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            type="button"
            size="sm"
            variant="default"
            disabled={pending}
            onClick={() => {
              startTransition(() => {
                router.push(ONLINE_COLLECTION_HREF);
              });
            }}
            data-ph-capture-attribute-action="go_online_pressed_offline"
          >
            {pending && <Spinner />}
            Go online
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type TProps = {
  trigger?: "button" | "menu-item";
};
