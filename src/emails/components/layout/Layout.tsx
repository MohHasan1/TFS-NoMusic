import { Body, Container, Head, Html, Preview, Tailwind } from "react-email";
import { tailwindConfig } from "../../tailwind.config";

export const Layout = ({ children, previewText }: LayoutProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>NoMusic - {previewText}</title>
          <meta name="color-scheme" content="dark" />
          <meta name="supported-color-schemes" content="dark" />
        </Head>
        <Preview>{previewText}</Preview>
        <Body className="bg-app my-auto mx-auto font-sans text-content-primary">
          <Container className="border border-solid border-border rounded-lg my-[40px] mx-auto p-card max-w-[465px] bg-card">
            {children}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  previewText: string;
};
