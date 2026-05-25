import type { TForm } from "#types/form";
import EmailField from "@/components/shared/form/fields/EmailField";
import TextField from "@/components/shared/form/fields/TextField";
import { FieldGroup } from "@/components/ui/field";
import { REQUEST_ACCESS_CLIENT, REQUEST_ACCESS_CONST } from "@/constants/public/request-access";
import type { TRequestAccessSchema } from "@/validations/public/request-access";

const RequestAccessFormContent = ({ form, isSubmitting, clearMessagesFn }: TProps) => {
  return (
    <form
      id={REQUEST_ACCESS_CONST.FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
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
                onChange={(e) => {
                  clearMessagesFn?.();
                  field.handleChange(e.target.value);
                }}
                disabled={isSubmitting}
              />
            );
          }}
        </form.Field>
        <form.Field name="email">
          {(field) => {
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
                onChange={(e) => {
                  clearMessagesFn?.();
                  field.handleChange(e.target.value);
                }}
                disabled={isSubmitting}
              />
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
  );
};

export default RequestAccessFormContent;

type TProps = {
  form: TForm<TRequestAccessSchema>;
  isSubmitting: boolean;
  clearMessagesFn?: () => void;
};
