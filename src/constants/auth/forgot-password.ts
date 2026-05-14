import { PUBLIC_ROUTES } from "#constants/routes";

export const FORGOT_PASSWORD_CONST = {
  FORM_ID: "forgot-password-form",
} as const;

export const FORGOT_PASSWORD_CLIENT = {
  FORM_TITLE: "Forgot your password? 🪄",
  FORM_DESC: "Looks like your password wandered off again. Let's fix that.",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "You remember your email... right?",
  VALIDATION_EMAIL_ERROR: "The support cat needs a real email to send the reset link.",

  ERROR_ALERT_TITLE: "Could not send reset link:",

  FALLBACK_ERROR: "Something unexpected happened. Please try again.",
  FALLBACK_SERVER_ERROR: "The servers are taking a quick break. Please try again soon.",

  SUBMIT_LBL: "Send reset link",
  SUBMIT_PENDING_LBL: "Sending link...",

  CTA_LBL: "Remembered it already?",
  CTA_LINK_LBL: "Back to sign in",
  CTA_HREF: PUBLIC_ROUTES.SIGNIN,
} as const;
