import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const WelcomeEmail = ({
  userName = "there",
  loginUrl = "https://nomusic.thefamilysuite.org",
}: WelcomeEmailProps) => {
  return (
    <Layout previewText="Welcome to NoMusic! 🎧">
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"You made it in, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎧"}
        </Heading>

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

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you did not expect this invite, congratulations! You are either accidentally family now, or someone typed the wrong email 😭 - jokes!"
          }
        </Text>
      </Section>
    </Layout>
  );
};

export default WelcomeEmail;

type WelcomeEmailProps = {
  userName?: string;
  loginUrl?: string;
};
