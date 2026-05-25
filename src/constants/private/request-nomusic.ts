export const REQUEST_NOMUSIC_CONST = {
  FORM_ID: "request-nomusic-form",
} as const;

export const REQUEST_NOMUSIC_CLIENT = {
  FORM_TITLE: "Request NoMusic 🎵",
  FORM_DESC: "Send a YouTube link and I'll check if I can add it.",

  URL_LBL: "YouTube link",
  URL_PLACEHOLDER: "https://youtube.com/watch?v=...",
  VALIDATION_URL_ERROR: "Please enter a valid YouTube link so the server cat can find it.",

  SUCCESS_ALERT_TITLE: "Request sent! 🐾",
  SUCCESS_SUBMIT_MSG: "I'll take a look and let the server cat add it if available 🐾",

  ERROR_ALERT_TITLE: "Could not send request:",
  ERROR_SUBMIT_MSG: "The server cat tripped over a cable. Please try again.",

  FALLBACK_WRONG_CREDENTIALS: "Something went wrong. Please try again.",
  FALLBACK_SERVER_ERROR: "Could not send your request right now. Please try again.",

  SUBMIT_LBL: "Send NoMusic Request",
  SUBMIT_PENDING_LBL: "Sending NoMusic Request...",
} as const;
