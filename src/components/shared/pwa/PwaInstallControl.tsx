"use client";

import { useEffect, useState } from "react";
import { logInfo } from "#loggers";
import { InstallHintDialog } from "./InstallHintDialog";
import { PwaInstallButton } from "./PwaInstallButton";
import type { BeforeInstallPromptEvent } from "./types";
import { getPwaInstallContext } from "./utils";

export function PwaInstallControl() {
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Stores the native install prompt so our button can trigger it later.
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const syncEnvironment = () => {
      const ctx = getPwaInstallContext();

      setIsIos(ctx.isIos);
      setIsSafari(ctx.isSafari);
      setIsStandalone(ctx.isStandalone);

      logInfo("[PWA install] sync", ctx);
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setIsStandalone(true);
    };

    syncEnvironment();

    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    mediaQuery.addEventListener("change", syncEnvironment);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      mediaQuery.removeEventListener("change", syncEnvironment);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
    } finally {
      setInstallPrompt(null);
    }
  };

  const canPromptInstall = installPrompt !== null;

  // Hide install UI when the app is already running as an installed app.
  if (isStandalone) return null;

  if (isIos) {
    return <InstallHintDialog isIos={isIos} isSafari={isSafari} />;
  }

  if (!isSafari && !canPromptInstall) return null;

  if (canPromptInstall) {
    return <PwaInstallButton onInstall={handleInstall} />;
  }

  return <InstallHintDialog isIos={isIos} isSafari={isSafari} />;
}

// Behavior:
// standalone app -> hide
// iPhone/iPad in browser -> install dialog
// prompt available -> install button
// desktop Safari without prompt -> install dialog
// other desktop browsers without prompt -> hide
