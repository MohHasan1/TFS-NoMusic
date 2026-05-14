import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const FormAlert = ({ title, errorMessage, successMessage }: TProps) => {
  if (!errorMessage && !successMessage) return null;

  const isError = Boolean(errorMessage);
  const alertTitle = title ?? (isError ? "Error" : "Success");
  const message = errorMessage || successMessage;

  return (
    <Alert className="rounded-4xl max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-50">
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
