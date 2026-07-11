import { cn } from "#lib/utils";

export function ViewContainer({ children, className }: TProps) {
  return <div className={cn("mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-96 md:pb-44 lg:px-16", className)}>{children}</div>;
}

type TProps = {
  children: React.ReactNode;
  className?: string;
};
