import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoMusic — Pure Vocals, Private Listening",
  description:
    "A private, invite-only space for listening to clean vocal tracks without instruments, made for a small trusted circle.",
};

export default function RootLayout({ children }: TProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}
    >
      <body className="min-h-dvh h-full">
        {children} <Toaster position="top-right" />
      </body>
    </html>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
