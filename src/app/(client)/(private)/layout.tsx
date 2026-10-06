import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata } from "next";
import { PrivateMobileBottomNav } from "#components/_layout/private/mobile-bottom-nav/PrivateMobileBottomNav";
import { PrivateNavbar } from "#components/_layout/private/navbar/PrivateNavbar";
import QueryProvider from "#components/private/_providers/QueryProvider";
import { GlowOrb } from "#components/shared/GlowOrb";
import { PlaylistAddDialogHost } from "#features/playlists/components/add-to-playlist/PlaylistAddDialogHost";
import PlayerBar from "#playback/components/player-bar/PlayerBar";
import { PlayerDialog } from "#playback/components/player-dialog/PlayerDialog";
import PlaybackInitializer from "#playback/initializer";

export const metadata: Metadata = {
  title: {
    default: "NoMusic",
    template: "%s | NoMusic",
  },
  description: "Your private space for clean vocal tracks, libraries, and playlists.",
};

export default function PrivateLayout({ children }: TProps) {
  return (
    <QueryProvider>
      <PrivateNavbar />
      <main className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10">
        <GlowOrb mode="fixed" position="top" />

        <SerwistProvider swUrl="/serwist/sw.js" cacheOnNavigation={false} options={{ scope: "/" }}>
          {children}
        </SerwistProvider>
      </main>
      <PrivateMobileBottomNav />

      <PlayerBar />
      <PlayerDialog />
      <PlaybackInitializer />
      <PlaylistAddDialogHost />
    </QueryProvider>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
