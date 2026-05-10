import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormSubmitButton = ({ isPending, label, pendingLabel, formId }: TProps) => {
  return (
    <Button type="submit" form={formId} disabled={isPending}>
      {isPending ? (
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
  label: string;
  pendingLabel?: string;
  isPending: boolean;
  formId: string;
};
