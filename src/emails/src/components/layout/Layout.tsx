import { Body, Container, Head, Html, Preview, Tailwind } from "react-email";
import { tailwindConfig } from "../../tailwind.config";

export const Layout = ({ children, previewText }: LayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-background my-auto mx-auto font-sans">
          <Container className="border border-solid border-border rounded-lg my-[40px] mx-auto p-card max-w-[465px] bg-surface">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  previewText: string;
};
