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
      <main className="relative bg-linear-to-br from-background to-background via-primary/10">
        <GlowOrb mode="fixed" position="top" />
        {children}
      </main>
      {/* <NoMusicPlayer /> */}
      {/* <NowPlayingSheet /> */}
    </>
  );
}
