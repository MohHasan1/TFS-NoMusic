import { Section, Text } from "react-email";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { EmailSignature } from "../_components/elements/EmailSignature";
import { Layout } from "../_components/layout/Layout";

export const AccessApprovedEmail = ({
  name = "there",
  signupUrl,
}: AccessApprovedEmailProps) => {
  return (
    <Layout previewText="You can now join NoMusic — the private vocals-only circle for family, siblings, and close friends.">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Your request has been approved, "}
          <span className="text-logo-nomusic uppercase">{name}</span>
          {" 🎉"}
        </EmailHeading>

        <Text className="text-content-secondary text-body">
          {
            "You can now join NoMusic — the private vocals-only circle for family, siblings, and close friends."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "The next step is creating your account. Click the button below, create your account, verify your email, and start enjoying NoMusic 🎧"
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {"Hopefully the vocals slowly replace your regular playlists!"}
        </Text>

        {signupUrl && <PrimaryButton href={signupUrl}>Create my account</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to cooperate, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{signupUrl}</Text>

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you run into any trouble creating your account, just contact me and I'll help you out."
          }
        </Text>

        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default AccessApprovedEmail;

type AccessApprovedEmailProps = {
  name?: string;
  signupUrl: string;
};
