import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { GlowOrb } from "@/components/home/GlowOrb"
import { HeroCTAs } from "@/components/home/HeroCTAs"
import { HeroTitle } from "@/components/home/HeroTitle"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="relative flex-1 flex flex-col items-center justify-center px-8 py-24 text-center">
        <GlowOrb />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
          <HeroTitle />
          <HeroCTAs />
        </div>
      </main>

      <Footer />
    </div>
  )
}
