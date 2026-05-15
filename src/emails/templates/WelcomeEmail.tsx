import { Section, Text } from "react-email";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { EmailSignature } from "../_components/elements/EmailSignature";
import { Layout } from "../_components/layout/Layout";

export const WelcomeEmail = ({
  userName = "there",
  loginUrl = "https://nomusic.thefamilysuite.org",
}: WelcomeEmailProps) => {
  return (
    <Layout previewText="Welcome to NoMusic! 🎧">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Welcome to NoMusic, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎧"}
        </EmailHeading>

        <Text className="text-content-secondary text-body">
          {
            "You officially made it into NoMusic. This is a private space for family, siblings, and close friends only, a small closed circle for vocals-only tracks without the instruments."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "Time to replace those instrumental-heavy songs with pure vocals, real emotions, and tracks that let the voices stand on their own."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "I made NoMusic for the people closest to me, and I hope you stick around long enough for vocals-only tracks to slowly replace your regular music taste!"
          }
        </Text>

        {loginUrl && <PrimaryButton href={loginUrl}>Start Listening</PrimaryButton>}

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you didn't expect this invite, either you're accidentally in the circle now, or someone typed the wrong email."
          }
        </Text>

        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default WelcomeEmail;

type WelcomeEmailProps = {
  userName?: string;
  loginUrl?: string;
};
