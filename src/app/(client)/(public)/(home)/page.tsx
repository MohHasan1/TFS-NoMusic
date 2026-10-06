import type { Metadata } from "next";
import HeroSection from "@/components/public/home/sections/HeroSection";

export const metadata: Metadata = {
  title: {
    absolute: "NoMusic — Pure Vocals, Private Listening",
  },
  description: "Private listening for clean vocal tracks.",
};

const Home = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4">
      <HeroSection />
    </div>
  );
};

export default Home;
