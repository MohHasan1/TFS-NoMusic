import { gradients } from "./constants";

export function getGradientFromText(value: string) {
  let hash = 0;

  for (let i = 0; i < 5; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}
