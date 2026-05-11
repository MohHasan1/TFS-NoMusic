import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/signup/SignupForms";

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
