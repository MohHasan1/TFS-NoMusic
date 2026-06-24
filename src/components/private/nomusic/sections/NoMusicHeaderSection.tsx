"use cache";

import { BrandLogo } from "#components/shared/BrandLogo";

const NoMusicHeaderSection = async () => {
  return (
    <header className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center">
          <span className="font-semibold uppercase text-xl sm:text-2xl md:text-3xl flex justify-center items-center gap-2">
            <BrandLogo />
            <span>Collection</span>
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base">
          Browse your private collection of vocals-only tracks.
        </p>
      </div>
    </header>
  );
};

export default NoMusicHeaderSection;

// TODO: centralzied header and para for responsiveness - typo
