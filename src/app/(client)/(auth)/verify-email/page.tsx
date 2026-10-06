import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailSection from "@/components/auth/verify-email/sections/VerifyEmailSection";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to finish setting up NoMusic.",
};

// TODO: ADD SKELETON
const VerifyEmailPage = () => {
  return (
    <Suspense>
      <VerifyEmailSection />
    </Suspense>
  );
};

export default VerifyEmailPage;
