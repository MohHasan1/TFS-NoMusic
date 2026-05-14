import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const VerifyEmail = ({ userName = "there", verificationUrl }: VerifyEmailProps) => {
  return (
    <Layout previewText="one last step before the vocals start 🎧">
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"Almost there, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎧"}
        </Heading>

        <Text className="text-content-secondary text-body">
          {
            "Before you enter the NoMusic circle, I just need to make sure this email actually belongs to you."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "Click the button below to verify your email and unlock the vocals-only side of the internet."
          }
        </Text>

        {verificationUrl && <PrimaryButton href={verificationUrl}>Verify My Email</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to cooperate, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{verificationUrl}</Text>

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "No instruments. No random people. Just vocals."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "This link expires in 24 hours. If you did not sign up for NoMusic, somebody either mistyped their email or secretly wants you in the circle 😭"
          }
        </Text>
      </Section>
    </Layout>
  );
};

export default VerifyEmail;

type VerifyEmailProps = {
  userName?: string;
  verificationUrl?: string;
};
