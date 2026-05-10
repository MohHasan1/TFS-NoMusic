import EmailField from "@/components/shared/form/EmailField";
import PasswordField from "@/components/shared/form/PasswordField";
import { FieldGroup } from "@/components/ui/field";
import { TSigninSchema } from "@/validations/auth";
import { ReactFormExtendedApi } from "@tanstack/react-form";

const SigninFormContent = ({ form }: TProps) => {
  return (
    <form
      id="sign-in-form"
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
                label="Email"
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
                label="Password"
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

type AppFormApi<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any, any, any>;

type TProps = {
  form: AppFormApi<TSigninSchema>;
};
