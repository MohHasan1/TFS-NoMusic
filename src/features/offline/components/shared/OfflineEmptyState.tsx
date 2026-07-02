import { RiDownload2Line } from "@remixicon/react";
import type { ComponentType } from "react";

export function OfflineEmptyState({ title, description, hint, icon: Icon }: TProps) {
  return (
    <section className="mx-auto w-full max-w-full rounded-3xl border border-dashed border-border/70 bg-card/70 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary-400">
          <Icon className="size-6" />
        </div>

        <h2 className="text-primary-200 font-semibold text-lg sm:text-xl">{title}</h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">{description}</p>

        <div className="mt-6 flex justify-center items-center gap-2 rounded-3xl border border-border/70 px-4 py-2 text-center text-xs sm:text-sm font-medium bg-primary/10 text-primary-400/80">
          <RiDownload2Line className="size-4 text-primary-400" />
          <p>{hint}</p>
        </div>
      </div>
    </section>
  );
}

type TIcon = ComponentType<{
  className?: string;
}>;

type TProps = {
  description: string;
  hint: string;
  icon: TIcon;
  title: string;
};
