import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { REQUEST_ACCESS_CLIENT, REQUEST_ACCESS_CONST } from "@/constants/public/request-access";
import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";

const RequestAccessFormFooter = ({ isPending, errorMsg }: TProps) => {
  return (
    <FormFooterContainer>
      <FormAlert title={REQUEST_ACCESS_CLIENT.ERROR_ALERT_TITLE} errorMessage={errorMsg} />
      <FormSubmitButton
        isSubmitting={isPending}
        label={REQUEST_ACCESS_CLIENT.SUBMIT_LBL}
        pendingLabel={REQUEST_ACCESS_CLIENT.SUBMIT_PENDING_LBL}
        formId={REQUEST_ACCESS_CONST.FORM_ID}
      />
      <FormCTA
        label={REQUEST_ACCESS_CLIENT.CTA_LBL}
        linkLabel={REQUEST_ACCESS_CLIENT.CTA_LINK_LBL}
        href={REQUEST_ACCESS_CLIENT.CTA_HREF}
        isSubmitting={isPending}
      />
    </FormFooterContainer>
  );
};

export default RequestAccessFormFooter;

type TProps = {
  errorMsg?: string;
  isPending: boolean;
};
