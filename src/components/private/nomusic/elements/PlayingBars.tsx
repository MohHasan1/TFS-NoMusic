export function PlayingBars() {
  return (
    <span className="flex justify-center items-end gap-0.5 p-3" aria-hidden>
      <span className="h-2 w-1 animate-pulse rounded-full bg-current" />
      <span className="h-4 w-1 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
      <span className="h-3 w-1 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
    </span>
  );
}
