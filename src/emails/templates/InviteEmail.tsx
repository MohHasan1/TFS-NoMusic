import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const InviteEmail = ({
  inviteeName = "there",
  inviterName = "Someone",
  inviteUrl = "https://nomusic.thefamilysuite.org/invite",
}: InviteEmailProps) => {
  return (
    <Layout
      previewText={`${inviterName} invited you to join the NoMusic circle 🎧`}
    >
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"You're invited, "}
          <span className="text-logo-nomusic uppercase">
            {inviteeName}
          </span>
          {" 🎧"}
        </Heading>

        <Text className="text-content-secondary text-body">
          {`${inviterName} just invited you to join NoMusic.`}
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
          {
            "Basically… this app slowly tries to replace your normal music taste ✨"
          }
        </Text>

        {inviteUrl && (
          <PrimaryButton href={inviteUrl}>
            Join the circle
          </PrimaryButton>
        )}

        <Text className="text-content-secondary text-body mt-4">
          {
            "If the button refuses to cooperate, copy and paste this link into your browser:"
          }
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">
          {inviteUrl}
        </Text>

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If this invite reached the wrong person, congratulations — you accidentally discovered the vocals-only side of the internet."
          }
        </Text>
      </Section>
    </Layout>
  );
};

export default InviteEmail;

type InviteEmailProps = {
  inviteeName?: string;
  inviterName?: string;
  inviteUrl?: string;
};