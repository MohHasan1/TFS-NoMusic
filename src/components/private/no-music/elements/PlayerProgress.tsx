type PlayerProgressProps = {
  currentTime?: string;
  duration?: string;
  progress?: number;
  showTime?: boolean;
};

export function PlayerProgress({
  currentTime = "0:00",
  duration = "0:00",
  progress = 0,
  showTime = true,
}: PlayerProgressProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex w-full items-center gap-3">
      {showTime ? (
        <span className="w-10 text-right font-mono text-[10px] text-muted-foreground">
          {currentTime}
        </span>
      ) : null}

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      {showTime ? (
        <span className="w-10 font-mono text-[10px] text-muted-foreground">
          {duration}
        </span>
      ) : null}
    </div>
  );
}
