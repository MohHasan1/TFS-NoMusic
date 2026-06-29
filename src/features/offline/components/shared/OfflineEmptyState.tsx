import { RiDownload2Line } from "@remixicon/react";
import type { ComponentType } from "react";

type TIcon = ComponentType<{
  className?: string;
}>;

type TProps = {
  description: string;
  hint: string;
  icon: TIcon;
  title: string;
};

export function OfflineEmptyState({ title, description, hint, icon: Icon }: TProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-3xl border border-dashed border-border/70 bg-card/70 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary-400">
          <Icon className="size-6" />
        </div>

        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>

        <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 pb-4 md:pb-2 text-center text-xs font-medium text-muted-foreground sm:flex-row sm:text-sm">
          <RiDownload2Line className="size-4 text-primary-400" />
          {hint}
        </div>
      </div>
    </section>
  );
}
