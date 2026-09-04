"use client";

import { RiShareForwardLine } from "@remixicon/react";
import { Button } from "#components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "#components/ui/dialog";
import type { TPwaInstallMode } from "./types";

export function InstallHintDialog({ mode }: TProps) {
  const steps = copyByMode[mode];

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button" size="xs" aria-label="Install NoMusic Dialog" title="Install NoMusic">
            <RiShareForwardLine className={"size-3"} data-icon="inline-start" aria-hidden="true" />
            <span className={"hidden text-center sm:inline"}>Install</span>
            {/* <RiShareForwardLine className="size-3" /> */}
          </Button>
        }
      />
      <DialogContent className="text-center max-w-sm bg-card-secondary">
        <DialogHeader>
          <DialogTitle className="text-primary-400/90">To Install NoMusic</DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <span className="block space-y-2 text-center">
              {steps.map((step, index) => (
                <span key={step} className="flex gap-2 text-muted-foreground/90">
                  <span className="font-medium">{index + 1}.</span>
                  <span>{step}</span>
                </span>
              ))}
            </span>
            <span className="block text-primary-200/90 text-center">If you already installed NoMusic, you can ignore this message.</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

type TProps = {
  mode: TDialogMode;
};

type TDialogMode = Extract<TPwaInstallMode, "ios-safari-manual" | "ios-google-manual" | "ios-other-manual" | "safari-desktop-manual">;

const copyByMode = {
  "ios-safari-manual": ["Tap Share, the square with the upward arrow, in Safari.", "Then scroll down, tap Add to Home Screen, and confirm by tapping Add."],

  "ios-google-manual": ["Tap Share, the square with the upward arrow, at the top right, beside the address bar.", "Then tap Add to Home Screen and confirm by tapping Add."],

  "ios-other-manual": ["Find and tap Share, the square with the upward arrow or ..., in your browser.", "Then tap Add to Home Screen and confirm by tapping Add."],

  "safari-desktop-manual": ["Click Share, the square with the upward arrow, in Safari's top toolbar.", "Then choose Add to Dock and confirm by clicking Add."],
};
