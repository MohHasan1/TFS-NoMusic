export const VERIFY_EMAIL_CLIENT = {
  LOADING_TITLE: "Verifying your email... ✨",
  LOADING_DESC: "Server cat is making sure this link is yours.",
  LOADING_CONTENT: "This should only take a moment.",

  SUCCESS_TITLE: "You made it in 🎉",
  SUCCESS_DESC: "Server cat verified your email. Welcome to the NoMusic circle.",
  SUCCESS_CONTENT:
    "You can now sign in and start exploring vocals-only tracks. Taking you to sign in...",

  ERROR_TITLE: "Verification didn't work 😭",
  ERROR_DESC: "This verification link is either expired, invalid, or already used.",
  ERROR_CONTENT:
    "Try opening the link from your email again. If it still doesn't work, please contact me.",

  VALIDATION_TOKEN_ERROR:
    "This verification link is missing, invalid, or expired. Please contact me.",

  FALLBACK_SERVER_ERROR: "Server cat hit a tiny bump. Try again in a bit.",
} as const;
