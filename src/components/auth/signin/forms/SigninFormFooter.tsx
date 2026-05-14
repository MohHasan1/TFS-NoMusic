import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { SIGNIN_CONST, SIGNIN_CLIENT } from "@/constants/auth/signin";
import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";

const SigninFormFooter = ({ isSubmitting, errorMsg }: TProps) => {
  return (
    <FormFooterContainer>
      <FormAlert title={SIGNIN_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        formId={SIGNIN_CONST.FORM_ID}
        label={SIGNIN_CLIENT.SUBMIT_LBL}
        pendingLabel={SIGNIN_CLIENT.SUBMIT_PENDING_LBL}
      />
      <FormCTA
        isSubmitting={isSubmitting}
        label={SIGNIN_CLIENT.CTA_LBL}
        linkLabel={SIGNIN_CLIENT.CTA_LINK_LBL}
        href={SIGNIN_CLIENT.CTA_HREF}
      />
    </FormFooterContainer>
  );
};

export default SigninFormFooter;

type TProps = {
  errorMsg?: string;
  isSubmitting: boolean;
};
