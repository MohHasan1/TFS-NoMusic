export function GlowOrb({ position = "center", isNeonGlow, mode = "fixed" }: TProps) {
  const positions = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    left: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  };

  const neonGlow = isNeonGlow ? "shadow-[0_0_120px_rgba(139,92,246,0.6)]" : null;
  const wrapperMode = mode === "fixed" ? "fixed" : "absolute";

  // -- inset-0: Will take fill its parent.
  return (
    <div
      className={`${wrapperMode} inset-0 pointer-events-none overflow-hidden`}
      aria-hidden="true"
    >
      <div
        className={`absolute size-150 rounded-full bg-radial from-primary/30 to-transparent
        blur-[90px] ${neonGlow} ${positions[position]}`}
      />
    </div>
  );
}

type TProps = {
  isNeonGlow?: boolean;
  mode?: "absolute" | "fixed";
  position?: "top" | "top-left" | "top-right" | "bottom" | "left" | "center" | "right";
};
