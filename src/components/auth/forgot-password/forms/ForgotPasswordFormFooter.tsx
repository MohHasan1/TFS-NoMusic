import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { FORGOT_PASSWORD_CONST, FORGOT_PASSWORD_CLIENT } from "@/constants/auth/forgot-password";
import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";

const ForgotPasswordFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <FormFooterContainer>
      <FormAlert title={FORGOT_PASSWORD_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        formId={FORGOT_PASSWORD_CONST.FORM_ID}
        label={FORGOT_PASSWORD_CLIENT.SUBMIT_LBL}
        pendingLabel={FORGOT_PASSWORD_CLIENT.SUBMIT_PENDING_LBL}
        data-ph-capture-attribute-action="forgot_password_pressed"
      />
      <FormCTA
        isSubmitting={isSubmitting}
        label={FORGOT_PASSWORD_CLIENT.CTA_LBL}
        linkLabel={FORGOT_PASSWORD_CLIENT.CTA_LINK_LBL}
        href={FORGOT_PASSWORD_CLIENT.CTA_HREF}
      />
    </FormFooterContainer>
  );
};

export default ForgotPasswordFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
