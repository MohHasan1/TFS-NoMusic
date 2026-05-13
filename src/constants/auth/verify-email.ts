export const VERIFY_EMAIL_CLIENT = {
  LOADING_TITLE: "Verifying your email... ✨",
  LOADING_DESC: "Give me a second while I make sure this link is actually yours.",
  LOADING_CONTENT: "This usually only takes a moment.",

  SUCCESS_TITLE: "You made it in 🎉",
  SUCCESS_DESC: "Your email has been verified successfully. Welcome to the NoMusic circle.",
  SUCCESS_CONTENT:
    "You can now sign in and start exploring vocals-only tracks. Redirecting you to the sign in page...",

  ERROR_TITLE: "That link did not work 😭",
  ERROR_DESC: "This verification link is either expired, invalid, or already used.",
  ERROR_CONTENT:
    "Try requesting another verification email and open the latest one. If you still need help, contact me.",

  FALLBACK_ERROR: "Something went a little off-script, try again?",
} as const;
