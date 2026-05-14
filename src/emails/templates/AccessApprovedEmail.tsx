import { Heading, Hr, Section, Text } from "react-email";
import { BrandLogo } from "../components/elements/BrandLogo";
import { PrimaryButton } from "../components/elements/PrimaryButton";
import { Layout } from "../components/layout/Layout";

export const AccessApprovedEmail = ({
  userName = "there",
  signupUrl = "https://nomusic.thefamilysuite.org/signup",
}: AccessApprovedEmailProps) => {
  return (
    <Layout previewText="Hurray! Your request has been approved 🎉">
      <BrandLogo />

      <Section>
        <Heading className="text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0">
          {"Your request has been approved, "}
          <span className="text-logo-nomusic uppercase">{userName}</span>
          {" 🎉"}
        </Heading>

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
          {"Hopefully the vocals slowly replace your regular playlists 😭"}
        </Text>

        {signupUrl && <PrimaryButton href={signupUrl}>Create my account</PrimaryButton>}

        <Text className="text-content-secondary text-body mt-4">
          {"If the button refuses to cooperate, copy and paste this link into your browser:"}
        </Text>

        <Text className="text-logo-nomusic text-xs break-all mt-2">{signupUrl}</Text>

        <Hr className="border-t border-solid border-border my-[26px] mx-0 w-full" />

        <Text className="text-content-muted text-small text-center italic">
          "Private circle. Vocals only. That's the whole point."
        </Text>

        <Text className="text-content-muted text-xs text-center">
          {
            "If you run into any trouble creating your account, just contact me and I'll help you out."
          }
        </Text>
      </Section>
    </Layout>
  );
};

export default AccessApprovedEmail;

type AccessApprovedEmailProps = {
  userName?: string;
  signupUrl?: string;
};
