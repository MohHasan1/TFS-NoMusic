import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { SIGNIN_CONST, SIGNIN_CLIENT } from "../../../constants/auth/signin";
import { Field } from "@/components/ui/field";

const SigninFormFooter = ({ isPending, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={SIGNIN_CLIENT.ERROR_ALERT_TITLE} errorMsg={errorMsg} />
      <FormSubmitButton
        isPending={isPending}
        label={SIGNIN_CLIENT.SUBMIT_LBL}
        pendingLabel={SIGNIN_CLIENT.SUBMIT_PENDING_LBL}
        formId={SIGNIN_CONST.FORM_ID}
      />
      <FormCTA
        label={SIGNIN_CLIENT.CTA_LBL}
        linkLabel={SIGNIN_CLIENT.CTA_LINK_LBL}
        href={SIGNIN_CLIENT.CTA_HREF}
      />
    </Field>
  );
};

export default SigninFormFooter;

type TProps = {
  errorMsg?: string;
  isPending: boolean;
};
