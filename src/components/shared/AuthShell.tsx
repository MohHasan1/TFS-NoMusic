import type { ReactNode } from "react"

import { Footer } from "@/components/layout/public/Footer"
import { Header } from "@/components/layout/public/Header"
import { GlowOrb } from "@/components/home/GlowOrb"

type AuthShellProps = {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="relative flex-1 flex items-center justify-center px-6 py-16 sm:px-8">
        <GlowOrb />
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </main>

      <Footer />
    </div>
  )
}
