"use client";

import { RiShareForwardLine } from "@remixicon/react";
import { Button } from "#components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/dialog";

export function InstallHintDialog({ isIos, isSafari }: TProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            aria-label="Install NoMusic Dialog"
          >
            <RiShareForwardLine data-icon="inline-start" />
          </Button>
        }
      />
      {/* TODO: standardize shadow */}
      <DialogContent className="max-w-sm border border-primary-400/20 bg-card-secondary shadow-[0_24px_80px_-40px_var(--color-primary)]">
        <DialogHeader>
          <DialogTitle className="text-primary-400">Install NoMusic</DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <span className="block">
              {isIos
                ? "Tap Share in the top right, then choose Add to Home Screen."
                : isSafari
                  ? "Open Share in the top right, then choose Add to Dock."
                  : "Reload this website once to try to get the normal install button."}
            </span>
            {isIos && (
              <span className="block">
                If you do not see Add to Home Screen here, open NoMusic in Safari and try again.
              </span>
            )}
            {!isIos && !isSafari && (
              <span className="block">
                If reload still does not show the install button, manually add NoMusic from the
                browser menu in the top right.
              </span>
            )}
            <span className="block text-primary-200">
              If you already installed NoMusic, you can ignore this message.
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

type TProps = {
  isIos: boolean;
  isSafari: boolean;
};
