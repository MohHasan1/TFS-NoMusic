import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";
import { NoMusicPlayer } from "@/components/private/no-music/sections/NoMusicPlayer";
import { NowPlayingSheet } from "@/components/private/no-music/sections/NowPlayingSheet";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      <main className="relative bg-linear-to-br from-background to-background via-primary/10">
        <GlowOrb mode="fixed"  position="top" />
        {/* <GlowOrb mode="fixed"  position="bottom" /> */}
        {children}
      </main>
      <NoMusicPlayer />
      <NowPlayingSheet />
    </>
  );
}
