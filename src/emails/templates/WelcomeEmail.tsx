import { EmailSignature } from "../_components/elements/EmailSignature";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { Layout } from "../_components/layout/Layout";
import { Section, Text } from "react-email";

export const WelcomeEmail = ({ name = "there", url, isPrev }: TProps) => {
  return (
    <Layout previewText="You officially made it into NoMusic. This is a private space for family, siblings, and close friends only, a small closed circle for vocals-only tracks without the instruments.">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Welcome to NoMusic, "}
          <span className="text-logo-nomusic uppercase">{name}</span>
          {" 🎧"}
        </EmailHeading>

        {isPrev && (
          <Text className="text-content-muted text-small mt-2">
            {
              "Lucky you — the server cat has blessed you with early access to test NoMusic while it is still in development."
            }
          </Text>
        )}

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

        {url && <PrimaryButton href={url}>Start Listening</PrimaryButton>}

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

type TProps = {
  name?: string;
  url: string;
  isPrev?: boolean;
};
