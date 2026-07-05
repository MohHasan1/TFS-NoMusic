import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";

import PlaybackInitializer from "#playback/initializer";
import PlayerBar from "#playback/components/player-bar/PlayerBar";
import { PlayerDialog } from "#playback/components/player-dialog/PlayerDialog";
import { AppFeedback } from "#components/shared/AppFeedback";
import { GlowOrb } from "#components/shared/GlowOrb";
import { OfflineNavbar } from "#features/offline/components/_layout/OfflineNavbar";
import "../(client)/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoMusic Offline",
  description: "Offline access to downloaded NoMusic songs and libraries.",
};

export default function OfflineLayout({ children }: TProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}
    >
      <body className="min-h-dvh h-full">
        <div className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10">
          <Suspense fallback={null}>
            <OfflineNavbar />
          </Suspense>
          <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col">
            <GlowOrb mode="fixed" position="top" />
            {children}
            <AppFeedback />
          </main>
          <PlayerBar />
          <PlayerDialog />
          <PlaybackInitializer />
        </div>
      </body>
    </html>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
