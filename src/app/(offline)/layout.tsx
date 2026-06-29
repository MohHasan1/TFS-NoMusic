import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { GlowOrb } from "#components/shared/GlowOrb";
import "../(client)/globals.css";
import { OfflineNavbar } from "#features/offline/components/_layout/OfflineNavbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoMusic Offline",
  description: "Offline access to downloaded NoMusic songs and libraries.",
};

export default function OfflineLayout({ children }: TProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}
    >
      <body className="min-h-dvh h-full">
        <div className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10">
          <OfflineNavbar />
          <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 lg:px-8">
            <GlowOrb mode="fixed" position="top" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

type TProps = Readonly<{
  children: React.ReactNode;
}>;
