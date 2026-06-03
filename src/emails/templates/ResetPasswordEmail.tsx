import { Section, Text } from "react-email";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { EmailSignature } from "../_components/elements/EmailSignature";
import { EarlyAccessNote } from "../_components/elements/EarlyAccessNote";
import { Layout } from "../_components/layout/Layout";

export const ResetPasswordEmail = ({ userName = "there", resetUrl, isPrev }: TProps) => {
  return (
    <Layout previewText="Forgot your password? 😭">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Password reset, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🗝️"}
        </EmailHeading>

        <EarlyAccessNote isPrev={isPrev} />

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

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "NoMusic misses you already."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you didn't request this password reset, please contact me so I can check it. Your account is still safe."
          }
        </Text>

        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default ResetPasswordEmail;

type TProps = {
  userName?: string;
  resetUrl: string;
  isPrev?: boolean;
};
