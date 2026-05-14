import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "No Music — Private Streaming",
  description: "A private, invite-only platform for streaming pure vocals with no instruments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceGrotesk.className} dark h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
