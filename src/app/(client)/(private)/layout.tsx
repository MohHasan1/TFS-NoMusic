import PlaybackInitializer from "#components/private/Initializer/PlaybackInitializer";
import { PrivateNavbar } from "#components/_layout/private/PrivateNavbar";
import QueryProvider from "#components/private/_providers/QueryProvider";
import PlayerBar from "#components/private/player/player-bar/PlayerBar";
import { GlowOrb } from "#components/shared/GlowOrb";
import { PlayerDialog } from "#components/private/player/player-dialog/PlayerDialog";

export default function PrivateLayout({ children }: TProps) {
  return (
    <>
      <QueryProvider>
        <PrivateNavbar />
        <main className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10">
          <GlowOrb mode="fixed" position="top" />
          {children}
        </main>
        <PlayerBar />
        <PlayerDialog/>
        <PlaybackInitializer />
      </QueryProvider>
    </>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
