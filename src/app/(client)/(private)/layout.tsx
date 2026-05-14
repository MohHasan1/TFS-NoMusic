import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";
import { NoMusicPlayer } from "@/components/private/no-music/sections/NoMusicPlayer";
import { NowPlayingSheet } from "@/components/private/no-music/sections/NowPlayingSheet";
import { GlowOrb } from "@/components/public/home/GlowOrb";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      <GlowOrb />
      <main>{children}</main>
      <NoMusicPlayer />
      <NowPlayingSheet />
    </>
  );
}
