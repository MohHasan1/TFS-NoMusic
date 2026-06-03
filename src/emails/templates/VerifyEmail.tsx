import { Section, Text } from "react-email";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { EmailSignature } from "../_components/elements/EmailSignature";
import { EarlyAccessNote } from "../_components/elements/EarlyAccessNote";
import { Layout } from "../_components/layout/Layout";

export const VerifyEmail = ({ userName = "there", verificationUrl, isPrev }: VerifyEmailProps) => {
  return (
    <Layout previewText="one last step before the vocals start 🎧">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Confirm your email, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎧"}
        </EmailHeading>

        <EarlyAccessNote isPrev={isPrev} />

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

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "Just voices, no noise, no randoms."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "This link expires in 24 hours. If you did not sign up for NoMusic, somebody either mistyped their email or secretly wants you in the circle."
          }
        </Text>

        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default VerifyEmail;

type VerifyEmailProps = {
  userName?: string;
  verificationUrl?: string;
  isPrev?: boolean;
};
