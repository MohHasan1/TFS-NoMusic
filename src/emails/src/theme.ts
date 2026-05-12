export const theme = {
  colors: {
    background: "#18181b",
    surface: "#27272a",

    primary: "#6d28d9",
    secondary: "#a1a1aa",

    text: {
      primary: "#f4f4f5",
      secondary: "#d4d4d8",
      muted: "#a1a1aa",
    },

    logo: {
      no: "rgba(255,255,255,0.8)",
      nomusic: "#7c3aed",
    },

    border: "#3f3f46",
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
