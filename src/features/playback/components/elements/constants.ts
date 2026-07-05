import { RiBracketsLine, RiRepeat2Line, RiRepeatOneLine, RiShuffleLine } from "@remixicon/react";

export const REPEAT_LABEL = {
  off: "Repeat off",
  all: "Repeat all",
  one: "Repeat one",
  random: "Repeat random",
} as const;

export const NEXT_REPEAT_LABEL = {
  off: "Enable repeat all",
  all: "Enable repeat one",
  one: "Enable repeat random",
  random: "Disable repeat",
} as const;

export const REPEAT_ICON = {
  off: RiBracketsLine,
  all: RiRepeat2Line,
  one: RiRepeatOneLine,
  random: RiShuffleLine,
} as const;
