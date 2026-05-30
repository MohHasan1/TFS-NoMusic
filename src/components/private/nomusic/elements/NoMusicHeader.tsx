import { BrandLogo } from "#components/shared/BrandLogo";
import { RiMusic2Line } from "@remixicon/react";

const NoMusicHeader = () => {
  return (
    <header className="space-y-1">
      <h1 className="flex justify-start items-center gap-4">
        <div className="font-semibold uppercase text-xl sm:text-2xl md:text-3xl flex justify-center items-center gap-2">
          <RiMusic2Line className="size-10 text-primary-400 border rounded-3xl p-2 bg-card" />
          <BrandLogo />
          <span>Collection</span>
        </div>
      </h1>
      <p className="max-w-2xl text-xs sm:text-sm md:text-base">
        Browse your private collection of vocals-only tracks.
      </p>
    </header>
  );
};

export default NoMusicHeader;

// TODO: centralzied header and para for responsiveness - typo