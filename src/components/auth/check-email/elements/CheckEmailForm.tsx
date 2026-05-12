import FormCard from "@/components/shared/form/FormCard";
import { CHECK_EMAIL_CLIENT } from "#constants/auth/check-email";
import CheckEmailContent from "./CheckEmailContent";
// import CheckEmailFooter from "./CheckEmailFooter";

const CheckEmailForm = () => {
  return (
    <FormCard
      title={CHECK_EMAIL_CLIENT.FORM_TITLE}
      description={CHECK_EMAIL_CLIENT.FORM_DESC}
      content={<CheckEmailContent />}
      // footer={<CheckEmailFooter />}
    />
  );
};

export default CheckEmailForm;
