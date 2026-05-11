export const SIGNUP_CONST = {
  FORM_ID: "sign-up-form",
} as const;

export const SIGNUP_CLIENT = {
  FORM_TITLE: "Welcome",
  FORM_DESC: "Let's get you set up in seconds.",

  NAME_LBL: "Your name",
  NAME_PLACEHOLDER: "What should we call you?",
  VALIDATION_NAME_ERROR: "Hey, we need your name for this one",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Drop your email",
  VALIDATION_EMAIL_ERROR: "That email doesn't look quite right",

  PASS_LBL: "Password",
  PASS_PLACEHOLDER: "Make it something you'll remember",
  VALIDATION_PASS_ERROR: "Please enter a password",

  CONFIRM_PASS_LBL: "Confirm Password",
  CONFIRM_PASS_PLACEHOLDER: "One more time",
  VALIDATION_CONFIRM_PASS_ERROR: "Passwords don't match yet",

  FALLBACK_ERROR: "Oops! Something went wrong. Try again?",
  FALLBACK_SERVER_ERROR: "Our servers are taking a quick break. Try again soon",
  FALLBACK_WRONG_CREDENTIALS: "That didn't match. Give it another try",

  EMAIL_NOT_IN_WHITELIST: "Hmm… this email didn't make the guest list yet. Try requesting access.",

  SUCCESS_ALERT_TITLE: "You're in",
  ERROR_ALERT_TITLE: "Not quite there yet",

  SUBMIT_LBL: "Sign up",
  SUBMIT_PENDING_LBL: "Setting things up...",

  CTA_LBL: "Already have access?",
  CTA_LINK_LBL: "Sign in",
  CTA_HREF: "/signin",
} as const;
