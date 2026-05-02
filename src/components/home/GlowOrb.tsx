export function GlowOrb() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-150 rounded-full bg-radial from-violet-600/20 to-transparent blur-[80px]" />
    </div>
  );
}
