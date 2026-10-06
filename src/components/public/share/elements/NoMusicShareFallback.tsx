import { Card } from "#components/ui/card";

export function NoMusicShareFallback() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="h-112 w-full animate-pulse border-border/70 bg-card/70" />
    </section>
  );
}
