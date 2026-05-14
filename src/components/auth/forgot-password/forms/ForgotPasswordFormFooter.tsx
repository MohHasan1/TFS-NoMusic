import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { FORGOT_PASSWORD_CONST, FORGOT_PASSWORD_CLIENT } from "@/constants/auth/forgot-password";
import { Field } from "@/components/ui/field";

const ForgotPasswordFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={FORGOT_PASSWORD_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        formId={FORGOT_PASSWORD_CONST.FORM_ID}
        label={FORGOT_PASSWORD_CLIENT.SUBMIT_LBL}
        pendingLabel={FORGOT_PASSWORD_CLIENT.SUBMIT_PENDING_LBL}
      />
      <FormCTA
        isSubmitting={isSubmitting}
        label={FORGOT_PASSWORD_CLIENT.CTA_LBL}
        linkLabel={FORGOT_PASSWORD_CLIENT.CTA_LINK_LBL}
        href={FORGOT_PASSWORD_CLIENT.CTA_HREF}
      />
    </Field>
  );
};

export default ForgotPasswordFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
