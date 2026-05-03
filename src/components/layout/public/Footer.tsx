export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-8 pb-8">
      {/* Waveform decoration */}
      <div
        className="w-full flex items-end justify-center gap-0.75 pb-8 opacity-20"
        aria-hidden="true"
      >
        {[
          12, 28, 18, 40, 22, 35, 14, 48, 20, 30, 16, 44, 26, 38, 18, 52, 24,
          36, 14, 46, 20, 32, 16, 42, 28, 50, 22, 38, 18, 44, 26, 36, 14, 48,
          20, 30, 16, 44, 26, 38, 18, 52, 24, 36, 14, 46, 20, 32, 16, 42, 28,
          50, 22, 38, 18, 44, 26, 36, 14, 48,
        ].map((h, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative barsx
            key={i}
            className="w-1 rounded-full bg-primary"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <p className="text-xs text-white/20 tracking-widest uppercase">
        Invite only · Private streaming
      </p>
    </footer>
  )
}
