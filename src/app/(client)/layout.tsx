import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { appleStartupImages } from "./appleStartupImages";
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
};

export default function RootLayout({ children }: TProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} dark h-full min-h-dvh antialiased bg-background`}
    >
      <body className="min-h-dvh h-full">
        <NextTopLoader
          easing="cubic-bezier(0.22, 1, 0.36, 1)"
          showSpinner={false}
          crawlSpeed={500}
          speed={180}
          height={3}
          color="linear-gradient(90deg, var(--primary-600) 0%, var(--primary-200) 45%, var(--primary-400) 100%)"
        />
        {children} <Toaster position="top-right" />
      </body>
    </html>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
