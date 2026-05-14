import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormSubmitButton = ({ isSubmitting, label, pendingLabel, formId }: TProps) => {
  return (
    <Button type="submit" form={formId} disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Spinner data-icon="inline-start" />
          <span>{pendingLabel || "Processing..."}</span>
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default FormSubmitButton;

type TProps = {
  formId: string;
  label: string;
  pendingLabel?: string;
  isSubmitting: boolean;
};
