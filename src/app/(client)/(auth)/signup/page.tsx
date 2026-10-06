import type { Metadata } from "next";
import SignupSection from "@/components/auth/signup/sections/SignupSection";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your NoMusic account and start private listening.",
};

const SignupPage = () => {
  return <SignupSection />;
};

export default SignupPage;
