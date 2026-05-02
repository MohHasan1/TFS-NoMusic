import { SignInForm } from "@/components/auth/SignInForm"
import { AuthShell } from "@/components/shared/AuthShell"

export default function LoginPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  )
}
