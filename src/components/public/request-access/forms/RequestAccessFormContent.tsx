import EmailField from "@/components/shared/form/fields/EmailField";
import TextField from "@/components/shared/form/fields/TextField";
import { FieldGroup } from "@/components/ui/field";

import { REQUEST_ACCESS_CLIENT, REQUEST_ACCESS_CONST } from "@/constants/public/request-access";
import { TRequestAccessSchema } from "@/validations/public/request-access";
import { ReactFormExtendedApi } from "@tanstack/react-form";

const RequestAccessFormContent = ({ form }: TProps) => {
  return (
    <form
      id={REQUEST_ACCESS_CONST.FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <TextField
                label={REQUEST_ACCESS_CLIENT.NAME_LBL}
                placeholder={REQUEST_ACCESS_CLIENT.NAME_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <EmailField
                label={REQUEST_ACCESS_CLIENT.EMAIL_LBL}
                placeholder={REQUEST_ACCESS_CLIENT.EMAIL_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            );
          }}
        />
      </FieldGroup>
    </form>
  );
};

export default RequestAccessFormContent;

type TProps = {
  form: AppFormApi<TRequestAccessSchema>;
};
type AppFormApi<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any, any, any>;
