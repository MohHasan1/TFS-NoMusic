import type { TPwaInstallContext } from "./types";

export function isIosInstallContext() {
  const ua = window.navigator.userAgent.toLowerCase();
  // iPadOS can report as Mac, so touch support is part of the check.
  const isIosDevice = /iphone|ipad|ipod/.test(ua) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);

  return isIosDevice;
}

export function isSafariContext() {
  const ua = window.navigator.userAgent.toLowerCase();
  const vendor = window.navigator.vendor;
  const isSafariEngine = ua.includes("safari");
  const hasAppleVendor = vendor === "Apple Computer, Inc.";
  // Exclude Safari-based user agents from Chrome, Edge, Firefox, and in-app browsers.
  const isOtherBrowser =
    ua.includes("crios") || ua.includes("fxios") || ua.includes("edgios") || ua.includes("opios") || ua.includes("gsa") || ua.includes("chrome") || ua.includes("chromium") || ua.includes("edg") || ua.includes("opr") || ua.includes("opera") || ua.includes("firefox") || ua.includes("duckduckgo");

  return isSafariEngine && hasAppleVendor && !isOtherBrowser;
}

export function isStandaloneMode() {
  const isDisplayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const isIosStandalone = Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

  return isDisplayModeStandalone || isIosStandalone;
}

export function getPwaInstallContext(): TPwaInstallContext {
  return {
    userAgent: window.navigator.userAgent,
    vendor: window.navigator.vendor,
    platform: window.navigator.platform,
    maxTouchPoints: window.navigator.maxTouchPoints,
    isIos: isIosInstallContext(),
    isSafari: isSafariContext(),
    isStandalone: isStandaloneMode(),
  };
}
