import EmailField from "@/components/shared/form/inputs/EmailField";
import PasswordField from "@/components/shared/form/inputs/PasswordField";
import { FieldGroup } from "@/components/ui/field";

import { SIGNIN_CLIENT, SIGNIN_CONST } from "@/constants/auth/signin";
import { TSigninSchema } from "@/validations/auth/signin";

import { ReactFormExtendedApi } from "@tanstack/react-form";

const SigninFormContent = ({ form }: TProps) => {
  return (
    <form
      id={SIGNIN_CONST.FORM_ID}
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
                label={SIGNIN_CLIENT.EMAIL_LBL}
                placeholder={SIGNIN_CLIENT.EMAIL_PLACEHOLDER}
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
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <PasswordField
                label={SIGNIN_CLIENT.PASS_LBL}
                placeholder={SIGNIN_CLIENT.PASS_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                onBlur={field.handleBlur}
                value={field.state.value}
                autoComplete="current-password"
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

export default SigninFormContent;

type TProps = {
  form: AppFormApi<TSigninSchema>;
};
type AppFormApi<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any, any, any>;
