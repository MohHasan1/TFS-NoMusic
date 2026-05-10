import { Footer } from "@/components/_layout/public/Footer";
import { Header } from "@/components/_layout/public/Header";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { HeroCTAs } from "@/components/public/home/HeroCTAs";
import { HeroTitle } from "@/components/public/home/HeroTitle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <GlowOrb position="top" isNeonGlow />

      <main className="relative flex-1 flex flex-col items-center justify-center px-8 py-24 text-center">
        <div className="relative z-10 flex flex-1 flex-col items-center gap-8 max-w-2xl">
          <HeroTitle />
          <HeroCTAs />
        </div>
      </main>

      <Footer />

      <GlowOrb position="bottom" isNeonGlow />
    </div>
  );
}
