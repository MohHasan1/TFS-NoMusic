import { Column, Row, Text, Section } from "react-email";

export const BrandLogo = () => {
  return (
    <Section className="">
      <Row>
        <Column align="center">
          <Text className="text-xl font-bold tracking-tight uppercase m-0">
            <span className="text-logo-no">No</span>
            <span className="text-logo-nomusic">Music</span>
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
