import { Suspense } from "react";
import VerifyEmailSection from "@/components/auth/verify-email/sections/VerifyEmailSection";

// TODO: ADD SKELETON
const VerifyEmailPage = () => {
  return (
    <Suspense>
      <VerifyEmailSection />
    </Suspense>
  );
};

export default VerifyEmailPage;
