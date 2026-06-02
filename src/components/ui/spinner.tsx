import { cn } from "@/lib/utils";
import { RiLoader4Line } from "@remixicon/react";

type SpinnerProps = {
  className?: string;
};

function Spinner({ className }: SpinnerProps) {
  return (
    <RiLoader4Line
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
    />
  );
}

export { Spinner };
