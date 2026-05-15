import VerifyEmailSection from "@/components/auth/verify-email/sections/VerifyEmailSection";
import { Suspense } from "react";

// TODO: ADD SKELETON
const VerifyEmailPage = () => {
  return (
    <Suspense>
      <VerifyEmailSection />
    </Suspense>
  );
};

export default VerifyEmailPage;
