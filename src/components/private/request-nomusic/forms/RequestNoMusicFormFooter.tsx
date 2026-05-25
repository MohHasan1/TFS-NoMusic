import { REQUEST_NOMUSIC_CLIENT, REQUEST_NOMUSIC_CONST } from "#constants/private/request-nomusic";
import FormFooterContainer from "@/components/shared/form/containers/FormFooterContainer";
import FormAlert from "@/components/shared/form/FormAlert";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";

const RequestNoMusicFormFooter = ({ errorMsg, successMsg, isSubmitting }: TProps) => {
  const title = errorMsg
    ? REQUEST_NOMUSIC_CLIENT.ERROR_ALERT_TITLE
    : REQUEST_NOMUSIC_CLIENT.SUCCESS_ALERT_TITLE;

  return (
    <FormFooterContainer>
      <FormAlert title={title} errorMessage={errorMsg} successMessage={successMsg} />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        formId={REQUEST_NOMUSIC_CONST.FORM_ID}
        label={REQUEST_NOMUSIC_CLIENT.SUBMIT_LBL}
        pendingLabel={REQUEST_NOMUSIC_CLIENT.SUBMIT_PENDING_LBL}
      />
    </FormFooterContainer>
  );
};

export default RequestNoMusicFormFooter;

type TProps = {
  errorMsg?: string;
  successMsg?: string;
  isSubmitting: boolean;
};
