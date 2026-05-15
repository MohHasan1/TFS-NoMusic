import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";

import { RESET_PASSWORD_CONST, RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";

const ResetPasswordFormFooter = ({ errorMessage, isDisabled, isSubmitting }: TProps) => {
  return (
    <FormFooterContainer>
      <FormAlert title={RESET_PASSWORD_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMessage} />
      <FormSubmitButton
        className={"mb-2"}
        disabled={isSubmitting || isDisabled}
        formId={RESET_PASSWORD_CONST.FORM_ID}
        label={RESET_PASSWORD_CLIENT.SUBMIT_LBL}
        pendingLabel={RESET_PASSWORD_CLIENT.SUBMIT_PENDING_LBL}
      />
    </FormFooterContainer>
  );
};

export default ResetPasswordFormFooter;

type TProps = {
  isSubmitting: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
};
