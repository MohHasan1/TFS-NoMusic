import type { Metadata } from "next";
import SigninSection from "@/components/auth/signin/sections/SigninSection";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your private NoMusic listening space.",
};

const SigninPage = async ({ searchParams }: TProps) => {
  const params = await searchParams;
  const redirectTo = typeof params.redirect === "string" ? params.redirect : undefined;

  return <SigninSection redirectTo={redirectTo} />;
};

export default SigninPage;

type TProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
