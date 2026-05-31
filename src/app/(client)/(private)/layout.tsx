import { AutoPlayBinding } from "#components/private/common/Bindings/AutoPlayBinding";
import { PrivateNavbar } from "#components/_layout/private/PrivateNavbar";
import QueryProvider from "#components/private/_providers/QueryProvider";
import PlayerBar from "#components/private/common/player-bar/PlayerBar";
import { GlowOrb } from "#components/shared/GlowOrb";

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
        <AutoPlayBinding />
        {/* <NowPlayingSheet /> */}
      </QueryProvider>
    </>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
