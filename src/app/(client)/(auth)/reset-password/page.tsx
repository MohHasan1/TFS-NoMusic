import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordSection from "@/components/auth/reset-password/sections/ResetPasswordSection";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your NoMusic account.",
};

// TODO: ADD SKELETON
const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordSection />
    </Suspense>
  );
};

export default ResetPasswordPage;
