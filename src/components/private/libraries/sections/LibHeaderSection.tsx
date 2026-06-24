import { BrandLogo } from "#components/shared/BrandLogo";

export default function LibHeaderSection() {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center">
          <span className="flex items-center justify-center gap-2 text-xl font-semibold uppercase sm:text-2xl md:text-3xl">
            <BrandLogo />
            <span>Libraries</span>
          </span>
        </h1>

        <p className="text-center text-xs sm:text-sm md:text-base">
          Organized private groups of NoMusic tracks in one place.
        </p>
      </div>
    </header>
  );
}
