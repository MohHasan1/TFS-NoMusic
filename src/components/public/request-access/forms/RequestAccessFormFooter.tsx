import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormAlert from "@/components/shared/form/FormAlert";
import FormCTA from "@/components/shared/form/FormCTA";

import { REQUEST_ACCESS_CLIENT, REQUEST_ACCESS_CONST } from "@/constants/public/request-access";
import { Field } from "@/components/ui/field";

const RequestAccessFormFooter = ({ isPending, errorMsg }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title={REQUEST_ACCESS_CLIENT.ERROR_ALERT_TITLE} errorMsg={errorMsg} />
      <FormSubmitButton
        isPending={isPending}
        label={REQUEST_ACCESS_CLIENT.SUBMIT_LBL}
        pendingLabel={REQUEST_ACCESS_CLIENT.SUBMIT_PENDING_LBL}
        formId={REQUEST_ACCESS_CONST.FORM_ID}
      />
      <FormCTA
        label={REQUEST_ACCESS_CLIENT.CTA_LBL}
        linkLabel={REQUEST_ACCESS_CLIENT.CTA_LINK_LBL}
        href={REQUEST_ACCESS_CLIENT.CTA_HREF}
      />
    </Field>
  );
};

export default RequestAccessFormFooter;

type TProps = {
  errorMsg?: string;
  isPending: boolean;
};
