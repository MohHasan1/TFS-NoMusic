export const theme = {
  colors: {
    background: "oklch(0.141 0.005 285.823)",
    surface: "oklch(0.985 0 0 / 0.05)", // matches --card in globals.css

    primary: "oklch(0.432 0.232 292.759)",
    secondary: "oklch(0.274 0.006 286.033)",

    text: {
      primary: "oklch(0.985 0 0)", // --foreground
      secondary: "oklch(0.892 0.058 281.85)", // --muted-foreground
      muted: "oklch(0.705 0.015 286.067)", // --sidebar-ring or similar muted tone
    },
    // oklch(0.892 0.058 281.85)

    logo: {
      no: "oklch(0.985 0 0 / 0.8)",
      nomusic: "oklch(0.558 0.288 302.321)", // --primary
    },

    border: "oklch(1 0 0 / 10%)", // --border
  },

  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },

  radius: {
    md: "8px",
    lg: "10px",
  },

  typography: {
    h1: {
      size: "24px",
      lineHeight: "32px",
    },
    body: {
      size: "14px",
      lineHeight: "24px",
    },
    small: {
      size: "12px",
      lineHeight: "20px",
    },
    xs: {
      size: "11px",
      lineHeight: "18px",
    },
  },

  spacing: {
    card: "32px",
  },
} as const;
