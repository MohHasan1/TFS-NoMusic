import { CHECK_EMAIL_CLIENT } from "@/constants/auth/check-email";
import FormCTA from "@/components/shared/form/FormCTA";

const CheckEmailFooter = () => {
  return (
    <FormCTA
      label={CHECK_EMAIL_CLIENT.CTA_LBL}
      linkLabel={CHECK_EMAIL_CLIENT.CTA_LINK_LBL}
      href={CHECK_EMAIL_CLIENT.CTA_HREF}
    />
  );
};

export default CheckEmailFooter;
