import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const FormAlert = ({ title, errorMsg, successMsg }: TProps) => {
  if (!errorMsg && !successMsg) return null;

  const isError = Boolean(errorMsg);
  const alertTitle = title ?? (isError ? "Error" : "Success");
  const message = errorMsg || successMsg;

  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-50">
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default FormAlert;

type TProps = {
  title?: string;
  errorMsg?: string;
  successMsg?: string;
};
