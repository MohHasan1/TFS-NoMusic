export function formatPlaybackTime(seconds: number, fallback: TTimeFallback = "dash"): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return fallback === "dash" ? "--:--" : "0:00";
  }

  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remaining = String(whole % 60).padStart(2, "0");

  return `${minutes}:${remaining}`;
}

type TTimeFallback = "zero" | "dash";

export const isNewByUpdatedDate = (updatedAt: Date | string): boolean => {
  const updatedDate = new Date(updatedAt);

  if (Number.isNaN(updatedDate.getTime())) return false;

  const now = new Date();

  const diffInMs = now.getTime() - updatedDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays < 20;
};
