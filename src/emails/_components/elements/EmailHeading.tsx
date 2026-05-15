import { Heading } from "react-email";

export const EmailHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Heading
      className={`capitalize text-content-primary text-h1 font-semibold text-center p-0 my-[30px] mx-0 ${
        className || ""
      }`.trim()}
    >
      {children}
    </Heading>
  );
};
