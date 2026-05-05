type PlayerProgressProps = {
  currentTime?: number;
  duration?: number;
  progress?: number;
  showTime?: boolean;
  onSeek?: (time: number) => void;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = String(whole % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export function PlayerProgress({
  currentTime = 0,
  duration = 0,
  progress = 0,
  showTime = true,
  onSeek,
}: PlayerProgressProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex w-full items-center gap-3">
      {showTime ? (
        <span className="w-10 text-right font-mono text-[10px] text-muted-foreground">
          {formatTime(currentTime)}
        </span>
      ) : null}

      <button
        type="button"
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
        onClick={(event) => {
          if (!onSeek || duration <= 0) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const ratio = (event.clientX - rect.left) / rect.width;
          const nextTime = Math.max(0, Math.min(duration, ratio * duration));
          onSeek(nextTime);
        }}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${safeProgress}%` }}
        />
      </button>

      {showTime ? (
        <span className="w-10 font-mono text-[10px] text-muted-foreground">
          {formatTime(duration)}
        </span>
      ) : null}
    </div>
  );
}
