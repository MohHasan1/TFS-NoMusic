import { Button, Section } from "react-email";

export const SecondaryButton = ({ href, children }: SecondaryButtonProps) => {
  return (
    <Section className="text-center mt-[32px] mb-[32px]">
      <Button
        className="bg-button-secondary rounded-button text-button-secondaryText text-small font-semibold no-underline text-center px-5 py-3"
        href={href}
      >
        {children}
      </Button>
    </Section>
  );
};

type SecondaryButtonProps = {
  href: string;
  children: React.ReactNode;
};
