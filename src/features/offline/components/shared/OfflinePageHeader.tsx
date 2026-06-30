import { BrandLogo } from "#components/shared/BrandLogo";

export function OfflinePageHeader({ title, description }: TProps) {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary-400">Offline mode.</p>

        <h1>
          <span className="flex items-center justify-center gap-2 text-xl font-semibold uppercase sm:text-2xl md:text-3xl">
            <BrandLogo />
            <span>{title}</span>
          </span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      </div>
    </header>
  );
}

type TProps = {
  description: string;
  title: string;
};
