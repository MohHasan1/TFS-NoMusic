import { Suspense } from "react";
import ResetPasswordSection from "@/components/auth/reset-password/sections/ResetPasswordSection";

// TODO: ADD SKELETON
const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordSection />
    </Suspense>
  );
};

export default ResetPasswordPage;
