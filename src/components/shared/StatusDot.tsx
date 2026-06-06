import { cn } from "@/lib/utils";

export function StatusDot({ className, ...props }: TProps) {
  return (
    <span
      aria-hidden={true}
      className={cn(
        "-top-0.5 -right-0.5 animate-pulse absolute size-2 rounded-full border-2 bg-primary-600/70",
        className,
      )}
      {...props}
    />
  );
}

type TProps = React.ComponentPropsWithoutRef<"span">;
