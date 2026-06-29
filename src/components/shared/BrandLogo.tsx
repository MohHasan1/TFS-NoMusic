import { cn } from "@/lib/utils";

export function BrandLogo({ className }: TProps) {
  return (
    <div className={cn("font-semibold uppercase flex", className)}>
      <h1 className="text-white/80">No</h1>
      <h1 className="bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
        Music
      </h1>
    </div>
  );
}

type TProps = React.ComponentPropsWithoutRef<"div">;
