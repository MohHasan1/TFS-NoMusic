import { cn } from "@/lib/utils";

const FormShell = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "flex-1 h-full flex items-start justify-center px-4 sm:px-8 py-9 sm:py-32",
        className,
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default FormShell;

type TProps = React.ComponentPropsWithoutRef<"div">;
