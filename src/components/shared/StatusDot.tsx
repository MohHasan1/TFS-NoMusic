import { cn } from "@/lib/utils";

export function StatusDot({ className, ...props }: TProps) {
  return (
    <span
      aria-hidden={true}
      className={cn(
        "-top-1 -right-1 animate-pulse absolute size-3 rounded-full border-2 border-card bg-primary",
        className,
      )}
      {...props}
    />
  );
}

type TProps = React.ComponentPropsWithoutRef<"span">;
