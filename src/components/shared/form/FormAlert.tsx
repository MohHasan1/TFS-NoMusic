import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const FormAlert = ({ title, errorMessage, successMessage }: TProps) => {
  if (!errorMessage && !successMessage) return null;

  const isError = Boolean(errorMessage);
  const alertTitle = title ?? (isError ? "Error" : "Success");
  const message = errorMessage || successMessage;

  return (
    <Alert className={cn(
        "max-w-md rounded-4xl",
        isError
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-primary-400/30 bg-primary-400/5 text-primary-400",
      )}>
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription className="text-wrap md:text-wrap">{message}</AlertDescription>
    </Alert>
  );
};

export default FormAlert;

type TProps = {
  title?: string;
  errorMessage?: string;
  successMessage?: string;
};