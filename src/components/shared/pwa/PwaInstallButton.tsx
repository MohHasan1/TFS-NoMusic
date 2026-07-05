"use client";

import { RiDownloadLine, RiInstallLine } from "@remixicon/react";
import { Button } from "#components/ui/button";

export function PwaInstallButton({ onInstall }: TProps) {
  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={onInstall}
      aria-label="Install NoMusic"
      title="Install NoMusic"
    >
      {/* <RiDownloadLine data-icon="inline-start" />
        <span className={"hidden sm:inline"}>Install</span> */}
      <RiInstallLine className={"size-3"} aria-hidden="true" />
    </Button>
  );
}

type TProps = {
  onInstall: () => Promise<void>;
};
