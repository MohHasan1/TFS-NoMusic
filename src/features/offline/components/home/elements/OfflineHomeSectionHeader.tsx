import { RiArrowRightLine } from "@remixicon/react";
import { OfflineLink } from "#offline/components/shared/OfflineLink";

export function OfflineHomeSectionHeader({ title, href, linkLabel }: TProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-primary-200 md:text-xl">
        {title}
      </h2>

      <OfflineLink
        href={href}
        className="group flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary-400 transition-colors hover:text-primary-200 md:text-xs"
      >
        {linkLabel}
        <RiArrowRightLine className="size-3 transition-transform group-hover:translate-x-1 md:size-3.5" />
      </OfflineLink>
    </div>
  );
}

type TProps = {
  title: string;
  href: string;
  linkLabel: string;
};
