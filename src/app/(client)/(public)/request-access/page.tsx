import { RequestAccessForm } from "@/components/public/requests/RequestAccessForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function RequestAccessPage() {
  return (
    <AuthShell>
      <RequestAccessForm />
    </AuthShell>
  );
}
