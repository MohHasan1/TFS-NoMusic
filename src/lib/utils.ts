import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnPayloadIdType(id: string | number) {
  if (typeof id === "number") return "number";
  else if (typeof id === "string") return "string";
}

export function isID(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}
