"use client";

import { useEffect, useState } from "react";

import { InstallHintDialog } from "./InstallHintDialog";
import type { BeforeInstallPromptEvent } from "./types";
import { PwaInstallButton } from "./PwaInstallButton";
import { getPwaInstallContext } from "./utils";
import { logInfo } from "#loggers";

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
  if (!isSafari && !canPromptInstall) return null;

  if (canPromptInstall) {
    return <PwaInstallButton onInstall={handleInstall} />;
  }

  return <InstallHintDialog isIos={isIos} isSafari={isSafari} />;
}

// Behavior:
// standalone app -> hide
// non-Safari without prompt -> hide
// prompt available -> install button
// Safari without prompt -> install dialog
