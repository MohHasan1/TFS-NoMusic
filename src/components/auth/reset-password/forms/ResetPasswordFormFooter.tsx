import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { RESET_PASSWORD_CONST, RESET_PASSWORD_CLIENT } from "@/constants/auth/reset-password";
import { Field } from "@/components/ui/field";

const ResetPasswordFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={RESET_PASSWORD_CLIENT.ERROR_ALERT_TITLE} errorMsg={errorMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        formId={RESET_PASSWORD_CONST.FORM_ID}
        label={RESET_PASSWORD_CLIENT.SUBMIT_LBL}
        pendingLabel={RESET_PASSWORD_CLIENT.SUBMIT_PENDING_LBL}
      />
      {/* <FormCTA
        isSubmitting={isSubmitting}
        label={RESET_PASSWORD_CLIENT.CTA_LBL}
        linkLabel={RESET_PASSWORD_CLIENT.CTA_LINK_LBL}
        href={RESET_PASSWORD_CLIENT.CTA_HREF}
      /> */}
    </Field>
  );
};

export default ResetPasswordFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
