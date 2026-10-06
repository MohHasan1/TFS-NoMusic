import type { Metadata } from "next";
import { Footer } from "@/components/_layout/public/Footer";
import { Header } from "@/components/_layout/public/Header";
import { GlowOrb } from "@/components/shared/GlowOrb";

export const metadata: Metadata = {
  title: {
    default: "Account | NoMusic",
    template: "%s | NoMusic",
  },
  description: "Access your private NoMusic listening space.",
};

export default function PrivateLayout({ children }: TProps) {
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
