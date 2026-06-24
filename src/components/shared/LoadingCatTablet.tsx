import { cn } from "#lib/utils";

export function LoadingCatTablet({ children, contentClassName, panelClassName }: TProps) {
  return (
    <div className="relative w-full overflow-visible pt-4">
      <div className="pointer-events-none absolute left-8 top-3 size-7 rotate-45 rounded-md bg-primary/30" />
      <div className="pointer-events-none absolute right-8 top-3 size-7 rotate-45 rounded-md bg-primary/30" />

      <div
        className={cn(
          "relative mt-3 rounded-[2rem] border border-primary/20 bg-background/85 p-5 shadow-inner",
          panelClassName,
        )}
      >
        <div className="pointer-events-none absolute left-6 top-6 size-2.5 rounded-full bg-primary/60" />
        <div className="pointer-events-none absolute right-6 top-6 size-2.5 rounded-full bg-primary/60" />

        <div
          className={cn(
            "rounded-[1.5rem] bg-linear-to-br from-primary/8 via-transparent to-primary-600/8",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type TProps = {
  children: React.ReactNode;
  contentClassName?: string;
  panelClassName?: string;
};
