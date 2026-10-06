import type { Metadata } from "next";
import CheckEmailSection from "@/components/auth/check-email/sections/CheckEmailSection";

export const metadata: Metadata = {
  title: "Check Your Email",
  description: "Check your inbox for the next step from NoMusic.",
};

const CheckEmailPage = () => {
  return <CheckEmailSection />;
};

export default CheckEmailPage;
