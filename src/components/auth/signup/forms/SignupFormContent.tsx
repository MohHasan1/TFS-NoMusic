import PasswordField from "@/components/shared/form/fields/PasswordField";
import EmailField from "@/components/shared/form/fields/EmailField";
import TextField from "@/components/shared/form/fields/TextField";
import { FieldGroup } from "@/components/ui/field";

import { SIGNUP_CONST, SIGNUP_CLIENT } from "#constants/auth/signup";
import { ReactFormExtendedApi } from "@tanstack/react-form";
import { TSignupSchema } from "@/validations/auth/signup";

const SignupFormContent = ({ form }: TProps) => {
  return (
    <form
      id={SIGNUP_CONST.FORM_ID}
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
                label={SIGNUP_CLIENT.NAME_LBL}
                placeholder={SIGNUP_CLIENT.NAME_PLACEHOLDER}
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
                label={SIGNUP_CLIENT.EMAIL_LBL}
                placeholder={SIGNUP_CLIENT.EMAIL_PLACEHOLDER}
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
                label={SIGNUP_CLIENT.PASS_LBL}
                placeholder={SIGNUP_CLIENT.PASS_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                onBlur={field.handleBlur}
                value={field.state.value}
                autoComplete="new-password"
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
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
                label={SIGNUP_CLIENT.CONFIRM_PASS_LBL}
                placeholder={SIGNUP_CLIENT.CONFIRM_PASS_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                onBlur={field.handleBlur}
                value={field.state.value}
                autoComplete="new-password"
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

export default SignupFormContent;

type TProps = {
  form: AppFormApi<TSignupSchema>;
};
type AppFormApi<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any, any, any>;
