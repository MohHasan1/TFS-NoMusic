import PlaybackInitializer from "#components/private/Initializer/PlaybackInitializer";
import { PlayerDialog } from "#components/private/player/player-dialog/PlayerDialog";
import { PrivateNavbar } from "#components/_layout/private/PrivateNavbar";
import QueryProvider from "#components/private/_providers/QueryProvider";
import PlayerBar from "#components/private/player/player-bar/PlayerBar";
import { GlowOrb } from "#components/shared/GlowOrb";
import { SerwistProvider } from "@serwist/turbopack/react";

export default function PrivateLayout({ children }: TProps) {
  return (
    <QueryProvider>
      <PrivateNavbar />
      <main className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10">
        <GlowOrb mode="fixed" position="top" />
        {/* {children} */}
        <SerwistProvider swUrl="/serwist/sw.js" cacheOnNavigation={false}>
          {children}
        </SerwistProvider>
      </main>
      <PlayerBar />
      <PlayerDialog />
      <PlaybackInitializer />
    </QueryProvider>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
