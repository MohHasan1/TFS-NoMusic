import { Button, Section } from "react-email";

export const PrimaryButton = ({ href, children }: PrimaryButtonProps) => {
  return (
    <Section className="text-center mt-8 mb-8">
      <Button
        className="bg-button-primary rounded-button text-button-primaryText text-small font-semibold no-underline text-center px-5 py-3"
        href={href}
      >
        {children}
      </Button>
    </Section>
  );
};

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
};
