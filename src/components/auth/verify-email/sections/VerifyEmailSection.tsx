import VerifyEmailSkeleton from "@/components/auth/verify-email/elements/VerifyEmailSkeleton";
import VerifyEmailForm from "@/components/auth/verify-email/elements/VerifyEmailForm";
import FormShell from "@/components/shared/form/FormShell";
import { Suspense } from "react";

// We dont need sk as this page is pre-rendered with SSG
const VerifyEmailSection = () => {
  return (
    <FormShell>
      <Suspense fallback={<VerifyEmailSkeleton />}>
        <VerifyEmailForm />
      </Suspense>
    </FormShell>
  );
};

export default VerifyEmailSection;
