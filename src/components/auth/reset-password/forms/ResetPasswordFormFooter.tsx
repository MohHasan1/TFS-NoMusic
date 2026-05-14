import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";

import { RESET_PASSWORD_CONST, RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { Field } from "@/components/ui/field";

const ResetPasswordFormFooter = ({ errorMessage, isDisabled, isSubmitting }: TProps) => {
  return (
    <Field orientation="responsive" className="space-y-3">
      <FormAlert title={RESET_PASSWORD_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMessage} />
      <FormSubmitButton
        className={"mb-2"}
        disabled={isSubmitting || isDisabled}
        formId={RESET_PASSWORD_CONST.FORM_ID}
        label={RESET_PASSWORD_CLIENT.SUBMIT_LBL}
        pendingLabel={RESET_PASSWORD_CLIENT.SUBMIT_PENDING_LBL}
      />
    </Field>
  );
};

export default ResetPasswordFormFooter;

type TProps = {
  errorMessage?: string;
  isSubmitting: boolean;
  isDisabled?: boolean;
};
