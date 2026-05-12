import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const ResetPasswordEmail = ({
  userName = "there",
  resetUrl = "https://nomusic.thefamilysuite.org/reset-password",
}: ResetPasswordEmailProps) => {
  return (
    <Layout previewText="Forgot your password? 😭">
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"Password reset, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🔑"}
        </Heading>

        <Text className="text-content-secondary text-body">
          {"Looks like your password disappeared into the void. It happens 😭"}
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {"Click the button below to set a new password and get back into NoMusic."}
        </Text>

        {resetUrl && <PrimaryButton href={resetUrl}>Reset my password</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to work, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{resetUrl}</Text>

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "NoMusic misses you already."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you did not request this password reset, you can safely ignore this email. Your account is still safe."
          }
        </Text>
      </Section>
    </Layout>
  );
};

export default ResetPasswordEmail;

type ResetPasswordEmailProps = {
  userName?: string;
  resetUrl?: string;
};
