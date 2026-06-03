import type { ReactNode } from "react";
import { Body, Container, Head, Html, Preview, Section, Tailwind } from "react-email";
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

        <Body className="bg-app font-sans text-content-primary m-0 p-0">
          <Section style={{ padding: "16px" }}>
            <Container
              className="border border-solid border-border rounded-lg p-card bg-card"
              style={{
                width: "100%",
                maxWidth: "465px",
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              {children}
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

type LayoutProps = {
  children: ReactNode;
  previewText: string;
};
