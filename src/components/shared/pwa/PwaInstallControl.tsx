"use client";

import { useEffect, useState } from "react";

import { InstallHintDialog } from "./InstallHintDialog";
import { PwaInstallButton } from "./PwaInstallButton";
import type { BeforeInstallPromptEvent } from "./types";
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
      console.info("[PWA install] appinstalled");
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
  const shouldShowInstallHint = !isStandalone && !canPromptInstall;

  // Hide install UI when the app is already running as an installed app.
  if (isStandalone) return null;

  if (canPromptInstall) {
    return <PwaInstallButton onInstall={handleInstall} />;
  }

  // Fall back to guidance when the browser never exposed an install prompt.
  if (!shouldShowInstallHint) return null;

  return <InstallHintDialog isIos={isIos} isSafari={isSafari} />;
}
