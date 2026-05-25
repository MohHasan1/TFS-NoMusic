import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import { REQUEST_ACCESS_CLIENT, REQUEST_ACCESS_CONST } from "@/constants/public/request-access";

const RequestAccessFormFooter = ({ isSubmitting, errorMsg, successMsg }: TProps) => {
  const title = errorMsg
    ? REQUEST_ACCESS_CLIENT.ERROR_ALERT_TITLE
    : REQUEST_ACCESS_CLIENT.SUCCESS_ALERT_TITLE;

  return (
    <FormFooterContainer>
      <FormAlert title={title} errorMessage={errorMsg} successMessage={successMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        label={REQUEST_ACCESS_CLIENT.SUBMIT_LBL}
        pendingLabel={REQUEST_ACCESS_CLIENT.SUBMIT_PENDING_LBL}
        formId={REQUEST_ACCESS_CONST.FORM_ID}
      />
      <FormCTA
        label={REQUEST_ACCESS_CLIENT.CTA_LBL}
        linkLabel={REQUEST_ACCESS_CLIENT.CTA_LINK_LBL}
        href={REQUEST_ACCESS_CLIENT.CTA_HREF}
        isSubmitting={isSubmitting}
      />
    </FormFooterContainer>
  );
};

export default RequestAccessFormFooter;

type TProps = {
  errorMsg?: string;
  successMsg?: string;
  isSubmitting: boolean;
};
