import { HeroCTAs } from "../elemnts/HeroCTAs";
import { HeroTitle } from "../elemnts/HeroTitle";

const HeroSection = () => {
  return (
    <section className="relative z-10 flex flex-1 flex-col items-center gap-8 max-w-2xl py-24">
      <HeroTitle />
      <HeroCTAs />
    </section>
  );
};

export default HeroSection;
