import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const FormSubmitButton = ({ isSubmitting, label, pendingLabel, formId, ...rest }: TProps) => {
  return (
    <Button type="submit" form={formId} disabled={isSubmitting} {...rest}>
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

type TProps = React.ComponentPropsWithoutRef<typeof Button> & {
  formId: string;
  label: string;
  pendingLabel?: string;
  isSubmitting?: boolean;
};
