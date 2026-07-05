import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import type { ComponentType } from "react";

import { Button } from "#components/ui/button";

export function PrivateEmptyState({ title, description, icon: Icon, ctaHref, ctaLabel }: TProps) {
  return (
    <section className="mx-auto w-full max-w-full rounded-3xl border border-dashed border-border/70 bg-card/70 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary-400">
          <Icon className="size-6" />
        </div>

        <h2 className="text-lg font-semibold text-primary-200 sm:text-xl">{title}</h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">{description}</p>

        {ctaHref && ctaLabel ? (
          <div className="mt-6">
            <Button
              nativeButton={false}
              render={<Link href={ctaHref}>{ctaLabel}</Link>}
              variant="outline"
              size="sm"
              className="border-border/70 bg-primary/10 text-primary-200 hover:bg-primary/15"
            >
              <RiArrowRightLine data-icon="inline-end" />
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type TIcon = ComponentType<{
  className?: string;
}>;

type TProps = {
  title: string;
  description: string;
  icon: TIcon;
  ctaHref?: string;
  ctaLabel?: string;
};
