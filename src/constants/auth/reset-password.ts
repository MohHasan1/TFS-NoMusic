export const RESET_PASSWORD_CONST = {
  FORM_ID: "reset-password-form",
} as const;

export const RESET_PASSWORD_CLIENT = {
  FORM_TITLE: "Reset your password 🗝️",
  FORM_DESC: "Let's get you back into NoMusic before the vocals miss you.",

  PASS_LBL: "New Password",
  PASS_PLACEHOLDER: "Make it strong, not guessable",
  VALIDATION_PASS_SIZE_ERROR: "Too short. Even the cat looks concerned.",
  VALIDATION_PASS_STRENGTH_ERROR: "Use uppercase, lowercase, a number, and a symbol to make it stronger.",

  CONFIRM_PASS_LBL: "Confirm Password",
  CONFIRM_PASS_PLACEHOLDER: "One more time, with feeling",
  VALIDATION_CONFIRM_PASS_EMPTY_ERROR: "Please confirm your password before the cats start judging.",
  VALIDATION_CONFIRM_PASS_MISMATCH_ERROR: "Passwords don't match. Even the cat noticed.",
  VALIDATION_RESET_PASS_ERROR: "Unable to reset your password right now. The cat says try again.",

  ERROR_ALERT_TITLE: "Meow... password reset failed:",
  TOKEN_ERROR_DESC: "This reset link is missing, invalid, or expired. Please request a new one.",

  FALLBACK_CLIENT_ERROR: "Something went wrong. The cat is pretending it wasn't involved.",
  FALLBACK_SERVER_ERROR: "The servers are taking a quick break. Please try again soon.",

  SUBMIT_LBL: "Reset password",
  SUBMIT_PENDING_LBL: "Saving your new secret...",
} as const;
