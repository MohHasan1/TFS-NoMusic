import type { Metadata } from "next";
import { BrandLogo } from "#components/shared/BrandLogo";

export const metadata: Metadata = {
  title: "App",
  description: "Open the NoMusic private listening app.",
};

export default function PwaSplashPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#110a1d] w-full">
      <BrandLogo className="text-5xl" />
    </main>
  );
}
