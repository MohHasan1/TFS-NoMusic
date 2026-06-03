import { Text } from "react-email";

export function EarlyAccessNote({ isPrev }: TProps) {
  if (!isPrev) return null;

  return (
    <Text
      className="text-small mt-4"
      style={{
        background: "rgba(139, 92, 246, 0.14)",
        border: "1px solid rgba(167, 139, 250, 0.45)",
        borderRadius: "12px",
        padding: "12px 14px",
        color: "#ddd6fe",
        lineHeight: "1.5",
        textAlign: "center",
      }}
    >
      {
        "🐾 Lucky you — the server cat has blessed you with early access to test NoMusic while it is still in development."
      }
    </Text>
  );
}

type TProps = {
  isPrev?: boolean;
};
