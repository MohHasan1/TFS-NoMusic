import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { SIGNUP_CLIENT, SIGNUP_CONST } from "@/constants/auth/signup";
import { Field } from "@/components/ui/field";

const SignupFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={SIGNUP_CLIENT.ERROR_ALERT_TITLE} errorMsg={errorMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        label={SIGNUP_CLIENT.SUBMIT_LBL}
        pendingLabel={SIGNUP_CLIENT.SUBMIT_PENDING_LBL}
        formId={SIGNUP_CONST.FORM_ID}
      />
      <FormCTA
        isSubmitting={isSubmitting}
        label={SIGNUP_CLIENT.CTA_LBL}
        linkLabel={SIGNUP_CLIENT.CTA_LINK_LBL}
        href={SIGNUP_CLIENT.CTA_HREF}
      />
    </Field>
  );
};

export default SignupFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
