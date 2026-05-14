import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormInputField = ({ className, ...props }: TProps) => {
  return <Input className={cn("text-xs md:text-sm", className)} {...props} />;
};

export default FormInputField;

type TProps = React.ComponentPropsWithoutRef<typeof Input>;
