import type { Metadata } from "next";
import ForgotPasswordSection from "@/components/auth/forgot-password/sections/ForgotPasswordSection";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset for your NoMusic account.",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordSection />;
};

export default ForgotPasswordPage;
