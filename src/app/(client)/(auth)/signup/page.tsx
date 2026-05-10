import { SignUpForm } from "@/components/auth/SignUpForm"
import { AuthShell } from "@/components/auth/AuthShell"

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  )
}
