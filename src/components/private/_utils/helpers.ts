import { gradients } from "./constants";

// The hash loop reads chars 0-4, so pad short strings to avoid NaN.
const GRADIENT_SEED_PAD = "nomusic";

export function getGradientFromText(value: string) {
  const seed = value.length >= 5 ? value : value + GRADIENT_SEED_PAD;

  let hash = 0;

  for (let i = 0; i < 5; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}
