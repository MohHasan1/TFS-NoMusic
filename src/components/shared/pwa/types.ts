export type TInstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<TInstallChoice>;
  userChoice: Promise<TInstallChoice>;
}

export type TPwaInstallContext = {
  userAgent: string;
  vendor: string;
  platform: string;
  maxTouchPoints: number;
  isIos: boolean;
  isSafari: boolean;
  isGoogleIos: boolean;
  isStandalone: boolean;
};

export type TPwaInstallMode = "hidden" | "prompt" | "ios-safari-manual" | "ios-google-manual" | "ios-other-manual" | "safari-desktop-manual";
