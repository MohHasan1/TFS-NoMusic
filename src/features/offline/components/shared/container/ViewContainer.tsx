import { cn } from "#lib/utils";

export function ViewContainer({ children, className }: TProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-10 w-full  max-w-7xl mx-auto  px-4 pt-24 pb-32 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

type TProps = {
  children: React.ReactNode;
  className?: string;
};
