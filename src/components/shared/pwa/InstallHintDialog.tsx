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
import type { TPwaInstallMode } from "./types";

export function InstallHintDialog({ mode }: TProps) {
  const steps = copyByMode[mode];

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
          <DialogTitle className="text-primary-400">To Install NoMusic</DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <span className="block space-y-2 text-left">
              {steps.map((step, index) => (
                <span key={step} className="flex gap-2">
                  <span className="font-medium text-primary-300">{index + 1}.</span>
                  <span>{step}</span>
                </span>
              ))}
            </span>
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
  mode: TDialogMode;
};

type TDialogMode = Extract<
  TPwaInstallMode,
  "ios-safari-manual" | "ios-google-manual" | "ios-other-manual" | "safari-desktop-manual"
>;

const copyByMode = {
  "ios-safari-manual": [
    "Tap Share, the square with the upward arrow, in Safari.",
    "Then scroll down, tap Add to Home Screen, and confirm by tapping Add.",
  ],

  "ios-google-manual": [
    "Tap Share, the square with the upward arrow, at the top right, beside the address bar.",
    "Then tap Add to Home Screen and confirm by tapping Add.",
  ],

  "ios-other-manual": [
    "Find and tap Share, the square with the upward arrow or ..., in your browser.",
    "Then tap Add to Home Screen and confirm by tapping Add.",
  ],

  "safari-desktop-manual": [
    "Click Share, the square with the upward arrow, in Safari's top toolbar.",
    "Then choose Add to Dock and confirm by clicking Add.",
  ],
};
