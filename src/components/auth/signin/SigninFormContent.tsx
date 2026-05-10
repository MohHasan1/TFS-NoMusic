import EmailField from "@/components/shared/form/EmailField";
import PasswordField from "@/components/shared/form/PasswordField";
import { FieldGroup } from "@/components/ui/field";
import { TSigninSchema } from "@/validations/auth/schema";
import { ReactFormExtendedApi } from "@tanstack/react-form";

import { SIGNIN_CLIENT, SIGNIN_CONST } from "../../../constants/auth/signin";

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
