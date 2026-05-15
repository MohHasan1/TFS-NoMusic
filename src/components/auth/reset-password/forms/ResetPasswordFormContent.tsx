import PasswordField from "@/components/shared/form/fields/PasswordField";
import { FieldGroup } from "@/components/ui/field";

import { TForm } from "#types/form";
import { RESET_PASSWORD_CONST, RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { TResetPasswordSchema } from "@/validations/auth/reset-password";

const ResetPasswordFormContent = ({ form, isSubmitting, isDisabled }: TProps) => {
  return (
    <form
      id={RESET_PASSWORD_CONST.FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <PasswordField
                label={RESET_PASSWORD_CLIENT.PASS_LBL}
                placeholder={RESET_PASSWORD_CLIENT.PASS_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isSubmitting || isDisabled}
                autoComplete="new-password"
              />
            );
          }}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <PasswordField
                label={RESET_PASSWORD_CLIENT.CONFIRM_PASS_LBL}
                placeholder={RESET_PASSWORD_CLIENT.CONFIRM_PASS_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isSubmitting || isDisabled}
                autoComplete="new-password"
              />
            );
          }}
        />
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordFormContent;

type TProps = {
  form: TForm<TResetPasswordSchema>;
  isSubmitting: boolean;
  isDisabled?: boolean;
};
