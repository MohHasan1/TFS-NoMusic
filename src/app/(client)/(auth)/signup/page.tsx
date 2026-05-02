import { SignUpForm } from "@/components/auth/SignUpForm"
import { AuthShell } from "@/components/shared/AuthShell"

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  )
}
