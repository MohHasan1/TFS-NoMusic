import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { Field } from "@/components/ui/field";
import { SIGNUP_CLIENT, SIGNUP_CONST } from "@/constants/auth/signup";

const SignupFormFooter = ({ isPending, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={SIGNUP_CLIENT.ERROR_ALERT_TITLE} errorMsg={errorMsg} />
      <FormSubmitButton
        isPending={isPending}
        label={SIGNUP_CLIENT.SUBMIT_LBL}
        pendingLabel={SIGNUP_CLIENT.SUBMIT_PENDING_LBL}
        formId={SIGNUP_CONST.FORM_ID}
      />
      <FormCTA
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
  isPending: boolean;
};
