import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const RequestedNoMusicAdded = ({
  userName = "there",
  returnUrl = "https://nomusic.thefamilysuite.org",
}: RequestedNoMusicAddedProps) => {
  return (
    <Layout previewText="Your requested NoMusic tracks were added 🎧">
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"Your request was added, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎧"}
        </Heading>

        <Text className="text-content-secondary text-body">
          {"Good news — the NoMusic tracks you requested were successfully added to the circle."}
        </Text>

        <Text className="text-content-secondary text-body mt-4">
          {"Your vocals-only collection just got a little better 😭"}
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

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {"Thanks for helping grow the NoMusic collection 🎧"}
        </Text>
      </Section>
    </Layout>
  );
};

export default RequestedNoMusicAdded;

type RequestedNoMusicAddedProps = {
  userName?: string;
  returnUrl?: string;
};
