import { PUBLIC_ROUTES } from "#constants/routes";

export const RESET_PASSWORD_CONST = {
  FORM_ID: "reset-password-form",
} as const;

export const RESET_PASSWORD_CLIENT = {
  FORM_TITLE: "Reset your password 🎧",
  FORM_DESC: "Enter your new password below to get back in tune.",

  PASS_LBL: "New Password",
  PASS_PLACEHOLDER: "Your new quiet little secret",
  VALIDATION_PASS_ERROR: "Your password needs at least 8 characters to hit the right note.",

  CONFIRM_PASS_LBL: "Confirm Password",
  CONFIRM_PASS_PLACEHOLDER: "One more time, with feeling",
  VALIDATION_CONFIRM_PASS_ERROR: "Passwords don't quite match, try again.",

  FALLBACK_ERROR: "Something went a little off-script, try again?",
  ERROR_ALERT_TITLE: "Sync error",

  SUBMIT_LBL: "Reset password",
  SUBMIT_PENDING_LBL: "Resyncing...",

  CTA_LBL: "Changed your mind?",
  CTA_LINK_LBL: "Back to sign in",
  CTA_HREF: PUBLIC_ROUTES.SIGNIN,
} as const;
