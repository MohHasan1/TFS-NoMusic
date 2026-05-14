export const RESET_PASSWORD_CONST = {
  FORM_ID: "reset-password-form",
} as const;

export const RESET_PASSWORD_CLIENT = {
  FORM_TITLE: "Reset your password 🗝️",
  FORM_DESC: "Let's get you back into NoMusic before the vocals miss you.",

  PASS_LBL: "New Password",
  PASS_PLACEHOLDER: "Your new quiet little secret",
  VALIDATION_PASS_SIZE_ERROR: "That password needs a little more strength.",
  VALIDATION_PASS_STRENGTH_ERROR:
    "Your password needs at least one uppercase letter, one lowercase letter, one number, and one symbol.",

  CONFIRM_PASS_LBL: "Confirm Password",
  CONFIRM_PASS_PLACEHOLDER: "One more time, with feeling",
  VALIDATION_CONFIRM_PASS_ERROR: "Passwords don't quite match, try again.",

  ERROR_ALERT_TITLE: "Oops... password reset failed:",
  TOKEN_ERROR_DESC: "This reset link is missing, invalid, or expired. Please request a new one.",
  FALLBACK_ERROR: "Something went a little off-script, try again?",

  SUBMIT_LBL: "Reset password",
  SUBMIT_PENDING_LBL: "Saving your new secret...",
} as const;
