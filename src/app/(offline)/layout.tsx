import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";

import PlaybackInitializer from "#components/private/Initializer/PlaybackInitializer";
import PlayerBar from "#components/private/player/player-bar/PlayerBar";
import { PlayerDialog } from "#components/private/player/player-dialog/PlayerDialog";
import { GlowOrb } from "#components/shared/GlowOrb";
import "../(client)/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { OfflineNavbar } from "#features/offline/components/_layout/OfflineNavbar";

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
          <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 lg:px-8">
            <GlowOrb mode="fixed" position="top" />
            {children}
            <Toaster position="top-right" />
            <NextTopLoader
              easing="cubic-bezier(0.22, 1, 0.36, 1)"
              showSpinner={false}
              crawlSpeed={500}
              speed={180}
              height={3}
              color="linear-gradient(90deg, var(--primary-600) 0%, var(--primary-200) 45%, var(--primary-400) 100%)"
            />
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
