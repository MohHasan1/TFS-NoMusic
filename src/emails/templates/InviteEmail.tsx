import { EmailSignature } from "../_components/elements/EmailSignature";
import { PrimaryButton } from "../_components/elements/PrimaryButton";
import { EmailHeading } from "../_components/elements/EmailHeading";
import { EmailDivider } from "../_components/elements/EmailDivider";
import { BrandLogo } from "../_components/elements/BrandLogo";
import { EarlyAccessNote } from "../_components/elements/EarlyAccessNote";
import { Layout } from "../_components/layout/Layout";
import { Section, Text } from "react-email";

export const InviteEmail = ({ name = "there", inviteUrl, isPrev }: TProps) => {
  return (
    <Layout previewText="NoMusic is a small private space for family, siblings, and close friends to listen to vocals-only tracks without the instruments.">
      <BrandLogo />

      <Section>
        <EmailHeading>
          {"Your NoMusic invite is here, "}
          <span className="text-logo-nomusic uppercase">{name}</span>
          {" 🎧"}
        </EmailHeading>

        <EarlyAccessNote isPrev={isPrev} />

        <Text className="text-content-secondary text-body">
          {"You've been invited to join the NoMusic circle."}
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "NoMusic is a small private space for family, siblings, and close friends to listen to vocals-only tracks without the instruments."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {
            "No public chaos. No random people. Just pure vocals, emotions, and the kind of tracks you end up replaying way too many times."
          }
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {"Basically… this app slowly tries to replace your normal music taste ✨"}
        </Text>

        {inviteUrl && <PrimaryButton href={inviteUrl}>Join the circle</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to cooperate, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{inviteUrl}</Text>

        <EmailDivider />

        <Text className="text-content-muted text-small text-center italic">
          "Vocals only. Shared quietly with the right people."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If this invite reached the wrong inbox, the server cat may have followed the wrong trail."
          }
        </Text>
        <EmailSignature />
      </Section>
    </Layout>
  );
};

export default InviteEmail;

type TProps = {
  name?: string;
  inviteUrl: string;
  isPrev?: boolean;
};
