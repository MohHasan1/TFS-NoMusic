import { appleStartupImages } from "./appleStartupImages";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { AppFeedback } from "#components/shared/AppFeedback";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoMusic — Pure Vocals, Private Listening",
  description: "Private listening for clean vocal tracks.",
  applicationName: "NoMusic",

  other: {
    "apple-mobile-web-app-capable": "yes",
  },

  appleWebApp: {
    capable: true,
    title: "NoMusic",
    startupImage: appleStartupImages,
  },
};

export const viewport: Viewport = {
  themeColor: "#160a26",
  colorScheme: "dark",
  userScalable: false,
  maximumScale: 1,
};

export default function RootLayout({ children }: TProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}
    >
      <body className="min-h-dvh h-full">
        <AppFeedback />
        {children}
      </body>
    </html>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
