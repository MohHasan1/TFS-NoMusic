import { Toaster } from "@/components/ui/sonner";

import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoMusic — Private Streaming",
  description: "A private, invite-only platform for streaming pure vocals with no instruments.",
};

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en" className={`${montserrat.className} dark h-full antialiased bg-background`}>
      <body>
        {children} <Toaster position="top-right" />
      </body>
    </html>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
