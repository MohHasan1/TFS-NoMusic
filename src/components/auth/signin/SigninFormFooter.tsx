import { Field } from "@/components/ui/field";
import { FormAlert } from "@/components/shared/form/FormAlert";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import FormCTA from "@/components/shared/form/FormCTA";

const SigninFormFooter = ({ isPending, error }: TProps) => {
  return (
    <Field orientation="responsive">
      <FormAlert title="Failed to sign in" errorMsg={error} />
      <FormSubmitButton
        isPending={isPending}
        label="Sign In"
        pendingLabel="Signing in..."
        formId="sign-in-form"
      />
      <FormCTA text="New here?" linkText="Request Access" href="/request-access" />
    </Field>
  );
};

export default SigninFormFooter;

type TProps = {
  error?: string;
  isPending: boolean;
};
