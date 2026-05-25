const bars = Array.from({ length: 50 }, (_, i) => 8 + ((i * 13) % 44));

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 bg-transparent px-8 pb-8">
      <div
        className="flex w-full items-end justify-center gap-0.75 overflow-hidden pb-8 opacity-20"
        aria-hidden="true"
      >
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-primary animate-pulse duration-300"
            style={{
              height: `${height}px`,
              animationDelay: `${height * 35}ms`,
            }}
          />
        ))}
      </div>

      <p className="text-xs tracking-widest text-muted-foreground/50 uppercase">
        Private circle · Vocals only
      </p>
    </footer>
  );
}
