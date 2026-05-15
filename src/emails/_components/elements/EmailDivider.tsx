import { Hr } from "react-email";

export const EmailDivider = ({ className }: { className?: string }) => {
  return (
    <Hr
      className={`w-full ${className ?? ""}`}
    />
  );
};
