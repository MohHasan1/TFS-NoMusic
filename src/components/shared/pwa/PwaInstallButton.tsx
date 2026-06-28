"use client";

import { RiDownloadLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { cn } from "#lib/utils";

export function PwaInstallButton({ onInstall }: TProps) {
  return (
    <div className={cn("flex justify-center items-center")}>
      <Button
        type="button"
        variant="default"
        size="xs"
        onClick={onInstall}
        aria-label="Install NoMusic"
      >
        <RiDownloadLine data-icon="inline-start" />
        <span className={"hidden sm:inline"}>Install</span>
      </Button>
    </div>
  );
}

type TProps = {
  onInstall: () => Promise<void>;
};
