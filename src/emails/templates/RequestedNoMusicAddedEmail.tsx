import { EmailHeading } from "../_components/elements/EmailHeading";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { EmailSignature } from "../_components/elements/EmailSignature";
import { Layout } from "../_components/layout/Layout";
import { Section, Text } from "react-email";

export const RequestedNoMusicAddedEmail = ({ name = "there", returnUrl }: TProps) => {
  return (
    <Layout previewText="Good news! The NoMusic tracks you requested were successfully added to the circle.˝">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Your request made it in, "}
          <span className="text-logo-nomusic uppercase">{name}</span>
          {" 🎧"}
        </EmailHeading>

        <Text className="text-content-secondary text-body">
          {"Good news! The NoMusic tracks you requested were successfully added to the circle."}
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {"Your vocals-only collection just got a little better!"}
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "You can now head back to NoMusic, search for the tracks, and replay them way more than you probably should."
          }
        </Text>

        {returnUrl && <PrimaryButton href={returnUrl}>Return to NoMusic</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to cooperate, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{returnUrl}</Text>

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "Just voices, shared with the right people."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {"Thanks for helping keep the NoMusic collection growing."}
        </Text>

        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default RequestedNoMusicAddedEmail;

type TProps = {
  name?: string | null;
  returnUrl: string;
};
