import { Footer } from "@/components/_layout/public/Footer";
import { Header } from "@/components/_layout/public/Header";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function PublicLayout({ children }: TProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      <GlowOrb position="right" isNeonGlow />

      <Header />
      <main className="flex-1 flex">{children}</main>
      <Footer />

      <GlowOrb position="left" isNeonGlow />
    </div>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
