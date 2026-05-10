import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/signin/SignInForm";

export default function LoginPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
