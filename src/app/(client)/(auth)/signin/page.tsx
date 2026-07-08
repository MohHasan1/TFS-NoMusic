import SigninSection from "@/components/auth/signin/sections/SigninSection";

const SigninPage = async ({ searchParams }: TProps) => {
  const params = await searchParams;
  const redirectTo = typeof params.redirect === "string" ? params.redirect : undefined;

  return <SigninSection redirectTo={redirectTo} />;
};

export default SigninPage;

type TProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
