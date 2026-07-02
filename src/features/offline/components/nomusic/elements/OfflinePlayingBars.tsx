export function OfflinePlayingBars() {
  return (
    <span className="flex items-end justify-center gap-0.5 p-3" aria-hidden>
      <span className="h-2 w-1 animate-pulse rounded-full bg-current" />
      <span className="h-4 w-1 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
      <span className="h-3 w-1 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
    </span>
  );
}
