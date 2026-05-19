export function formatPlaybackTime(seconds: number): string {
  if (seconds === 0 ) return "--:--"
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remaining = String(whole % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}
