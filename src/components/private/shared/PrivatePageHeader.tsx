import { BrandLogo } from "#components/shared/BrandLogo";

export function PrivatePageHeader({ title, description }: TProps) {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center">
          <span className="flex items-center justify-center gap-2 text-xl font-semibold uppercase sm:text-2xl md:text-3xl">
            <BrandLogo />
            <span>{title}</span>
          </span>
        </h1>

        <p className="text-center text-xs sm:text-sm md:text-base">{description}</p>
      </div>
    </header>
  );
}

type TProps = {
  title: string;
  description: string;
};
