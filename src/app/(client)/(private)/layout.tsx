import { PlayerAutoPlay } from "#components/private/common/elements/Autoplay";
import PlayerBar from "#components/private/common/player-bar/PlayerBar";
// import { NoMusicPlayer } from "#components/private/common/sections/NoMusicPlayer";
// import { NowPlayingSheet } from "#components/private/common/sections/NowPlayingSheet";
import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      <main className="min-h-dvh relative bg-linear-to-br from-background to-background via-primary/10">
        <GlowOrb mode="fixed" position="top" />
        {children}
      </main>
      <PlayerBar />
      <PlayerAutoPlay />
      {/* <NoMusicPlayer /> */}
      {/* <NowPlayingSheet /> */}
    </>
  );
}
