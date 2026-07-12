"use client";

import { RiInstallLine } from "@remixicon/react";
import { Button } from "#components/ui/button";

export function PwaInstallButton({ onInstall }: TProps) {
  return (
    <Button
      type="button"
      variant="default"
      size="xs"
      onClick={onInstall}
      aria-label="Install NoMusic"
      title="Install NoMusic"
      data-ph-capture-attribute-action="install_pressed"
    >
      <RiInstallLine className={"size-3"} data-icon="inline-start" aria-hidden="true" />
      <span className={"hidden text-center sm:inline"}>Install</span>
      {/* <RiInstallLine className={"size-3"} aria-hidden="true" /> */}
    </Button>
  );
}

type TProps = {
  onInstall: () => Promise<void>;
};
