import { cn } from "#lib/utils";

export function PrivatePageShell({ children, className }: TProps) {
  return <div className={cn("mx-auto flex-1 w-full max-w-7xl space-y-10 px-4 pt-24 pb-96 md:pb-44 lg:px-16", className)}>{children}</div>;
}

type TProps = React.ComponentPropsWithoutRef<"div">;
