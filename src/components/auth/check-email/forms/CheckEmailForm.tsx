import { CHECK_EMAIL_CLIENT } from "#constants/auth/check-email";
import FormCard from "@/components/shared/form/FormCard";
import CheckEmailContent from "./CheckEmailContent";

const CheckEmailForm = () => {
  return (
    <FormCard
      title={CHECK_EMAIL_CLIENT.FORM_TITLE}
      description={CHECK_EMAIL_CLIENT.FORM_DESC}
      content={<CheckEmailContent />}
    />
  );
};

export default CheckEmailForm;
