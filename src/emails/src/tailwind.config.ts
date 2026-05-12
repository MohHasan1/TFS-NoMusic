import { pixelBasedPreset, TailwindConfig } from "react-email";
import { theme } from "./theme";

export const tailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
        },
        logo: {
          no: theme.colors.logo.no,
          nomusic: theme.colors.logo.nomusic,
        },
        content: {
          primary: theme.colors.text.primary,
          secondary: theme.colors.text.secondary,
          muted: theme.colors.text.muted,
        },
        button: {
          primary: theme.colors.primary,
          primaryText: theme.colors.text.primary,
          secondary: theme.colors.secondary,
          secondaryText: theme.colors.text.primary,
        },
        surface: theme.colors.surface,
        background: theme.colors.background,
        border: theme.colors.border,
      },
      borderRadius: {
        md: theme.radius.md,
        lg: theme.radius.lg,
        button: theme.radius.lg,
      },
      fontSize: {
        h1: [theme.typography.h1.size, { lineHeight: theme.typography.h1.lineHeight }],
        body: [theme.typography.body.size, { lineHeight: theme.typography.body.lineHeight }],
        small: [theme.typography.small.size, { lineHeight: theme.typography.small.lineHeight }],
        xs: [theme.typography.xs.size, { lineHeight: theme.typography.xs.lineHeight }],
      },
      spacing: {
        card: theme.spacing.card,
      },
    },
  },
} as TailwindConfig;
