import FormShell from "@/components/shared/form/containers/FormShell";
import SigninForm from "../forms/SignInForm";

const SigninSection = ({ redirectTo }: TProps) => {
  return (
    <FormShell>
      <SigninForm redirectTo={redirectTo} />
    </FormShell>
  );
};

export default SigninSection;

type TProps = {
  redirectTo?: string;
};
