// import { Space_Grotesk } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-sans",
// });

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
    <html lang="en" className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}>
      <body className="min-h-dvh h-full">
        {children} <Toaster position="top-right" />
      </body>
    </html>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;

// <html lang="en" className={`${montserrat.className} dark h-full antialiased bg-background`}>
// className={`${spaceGrotesk.variable} ${spaceGrotesk.className} dark h-full antialiased bg-background`}
