import { AuthShell } from "@/components/auth/AuthShell";
import { SigninForm } from "@/components/auth/signin/SignInForm";

export default function SigninPage() {
  return (
    <AuthShell>
      <SigninForm />
    </AuthShell>
  );
}
