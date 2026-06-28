"use client";

import { useEffect, useState } from "react";
import { logInfo } from "#loggers";
import { InstallHintDialog } from "./InstallHintDialog";
import { PwaInstallButton } from "./PwaInstallButton";
import type { BeforeInstallPromptEvent } from "./types";
import { getPwaInstallContext, getPwaInstallMode } from "./utils";

export function PwaInstallControl() {
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isGoogleIos, setIsGoogleIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Stores the native install prompt so our button can trigger it later.
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const syncEnvironment = () => {
      const ctx = getPwaInstallContext();

      setIsIos(ctx.isIos);
      setIsSafari(ctx.isSafari);
      setIsGoogleIos(ctx.isGoogleIos);
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
  const installMode = getPwaInstallMode({
    isIos,
    isSafari,
    isGoogleIos,
    isStandalone,
    canPromptInstall,
  });

  if (installMode === "hidden") return null;
  if (installMode === "prompt") {
    return <PwaInstallButton onInstall={handleInstall} />;
  }

  return <InstallHintDialog mode={installMode} />;
}

// Behavior:
// standalone app -> hide
// prompt available -> install button
// iPhone/iPad Safari -> show Safari steps
// iPhone/iPad Google/Chrome -> show open-in-Safari steps
// iPhone/iPad other browsers -> show Safari fallback steps
// Mac Safari without prompt -> show Add to Dock steps
// other desktop browsers without prompt -> hide
