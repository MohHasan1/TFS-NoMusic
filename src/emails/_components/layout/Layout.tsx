import { Body, Container, Head, Html, Preview, Tailwind } from "react-email";
import { tailwindConfig } from "../../tailwind.config";

export const Layout = ({ children, previewText }: LayoutProps) => {
  const title = `NoMusic - ${previewText}`;
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>{title}</title>
          <meta name="color-scheme" content="dark" />
          <meta name="supported-color-schemes" content="dark" />
        </Head>
        <Preview>{previewText}</Preview>
        <Body className="flex justify-center items-center bg-app my-auto mx-auto font-sans text-content-primary">
          <Container className="border border-solid border-border rounded-lg my-4 mx-4 p-card max-w-116.25 bg-card">
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
