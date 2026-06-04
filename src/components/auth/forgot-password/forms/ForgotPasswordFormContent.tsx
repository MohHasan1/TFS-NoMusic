import EmailField from "@/components/shared/form/fields/EmailField";
import { FieldGroup } from "@/components/ui/field";

import { TForm } from "#types/form";
import { FORGOT_PASSWORD_CONST, FORGOT_PASSWORD_CLIENT } from "#constants/auth/forgot-password";
import { TForgotPasswordSchema } from "@/validations/auth/forgot-password";

const ForgotPasswordFormContent = ({ form, isSubmitting, clearErrorFn }: TProps) => {
  return (
    <form
      id={FORGOT_PASSWORD_CONST.FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <EmailField
                label={FORGOT_PASSWORD_CLIENT.EMAIL_LBL}
                placeholder={FORGOT_PASSWORD_CLIENT.EMAIL_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => {
                  clearErrorFn?.();
                  field.handleChange(e.target.value.toLowerCase());
                }}
                disabled={isSubmitting}
              />
            );
          }}
        />
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordFormContent;

type TProps = {
  form: TForm<TForgotPasswordSchema>;
  isSubmitting: boolean;
  clearErrorFn?: () => void;
};
