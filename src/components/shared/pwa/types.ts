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
  isStandalone: boolean;
};
