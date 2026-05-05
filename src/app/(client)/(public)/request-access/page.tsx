import { RequestAccessForm } from "@/components/public/requests/RequestAccessForm";
import { AuthShell } from "@/components/shared/AuthShell";

export default function RequestAccessPage() {
  return (
    <AuthShell>
      <RequestAccessForm />
    </AuthShell>
  );
}
