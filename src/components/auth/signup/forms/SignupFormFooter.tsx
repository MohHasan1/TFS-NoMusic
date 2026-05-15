import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";

import { SIGNUP_CLIENT, SIGNUP_CONST } from "@/constants/auth/signup";

const SignupFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <FormFooterContainer>
      <FormAlert title={SIGNUP_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMsg} />
      <FormSubmitButton
        className={"mb-2"}
        isSubmitting={isSubmitting}
        label={SIGNUP_CLIENT.SUBMIT_LBL}
        pendingLabel={SIGNUP_CLIENT.SUBMIT_PENDING_LBL}
        formId={SIGNUP_CONST.FORM_ID}
      />
    </FormFooterContainer>
  );
};

export default SignupFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
