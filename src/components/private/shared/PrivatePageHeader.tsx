import { BrandLogo } from "#components/shared/BrandLogo";

export function PrivatePageHeader({ title, description }: TProps) {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex max-w-3xl flex-col items-center justify-center text-center">
        <h1>
          <span className="flex items-center justify-center gap-2 text-xl font-semibold uppercase sm:text-2xl md:text-3xl">
            <BrandLogo />
            <span>{title}</span>
          </span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-primary-200 sm:text-base">
          {description}
        </p>
      </div>
    </header>
  );
}

type TProps = {
  title: string;
  description: string;
};
