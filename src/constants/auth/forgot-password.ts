import { PUBLIC_ROUTES } from "#constants/routes";

export const FORGOT_PASSWORD_CONST = {
  FORM_ID: "forgot-password-form",
} as const;

export const FORGOT_PASSWORD_CLIENT = {
  FORM_TITLE: "Forgot your password? 🎧",
  FORM_DESC: "Don't worry, even the best singers lose their pitch sometimes. Let's get you back.",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Enter your registered email",
  VALIDATION_EMAIL_ERROR: "Hmm… that email doesn't look right",

  FALLBACK_ERROR: "Something went a little off-script, try again?",
  ERROR_ALERT_TITLE: "Note missed",

  SUBMIT_LBL: "Send reset link",
  SUBMIT_PENDING_LBL: "Sending link...",

  CTA_LBL: "Remembered it?",
  CTA_LINK_LBL: "Sign in here",
  CTA_HREF: PUBLIC_ROUTES.SIGNIN,
} as const;
