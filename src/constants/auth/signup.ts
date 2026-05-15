export const SIGNUP_CONST = {
  FORM_ID: "sign-up-form",
} as const;

export const SIGNUP_CLIENT = {
  FORM_TITLE: "Welcome to NoMusic 🐾",
  FORM_DESC: "Add your details, and our server cat will take it from here.",

  NAME_LBL: "Your name",
  NAME_PLACEHOLDER: "Your name, so the cat knows who's here",
  VALIDATION_NAME_MIN_ERROR: "Hey, we need your name for this one.",
  VALIDATION_NAME_MAX_ERROR: "Whoa, that's a long name!",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Use your invite email",
  VALIDATION_EMAIL_ERROR: "That email doesn't look right. The cat squinted too.",

  PASS_LBL: "Password",
  PASS_PLACEHOLDER: "Make it something only you'll remember",
  VALIDATION_PASS_MIN_ERROR: "Please add a password before the cat starts guessing.",
  VALIDATION_PASS_STRENGTH_ERROR:
    "Use uppercase, lowercase, and a number so the cat can't guess it.",

  CONFIRM_PASS_LBL: "Confirm Password",
  CONFIRM_PASS_PLACEHOLDER: "One more time",
  VALIDATION_CONFIRM_PASS_EMPTY_ERROR:
    "Please confirm your password before the cats start judging.",
  VALIDATION_CONFIRM_PASS_MISMATCH_ERROR: "Passwords don't match. Even the cat noticed.",

  ERROR_ALERT_TITLE: "Meow... Signup failed!",

  FALLBACK_WRONG_CREDENTIALS: "That didn't match. Give it another try",
  EMAIL_NOT_IN_WHITELIST:
    "Meow… the guard cat couldn't find your email on the list. Request access first.",

  FALLBACK_CLIENT_ERROR: "Oops! Something went wrong. Try again?",
  FALLBACK_SERVER_ERROR: "Our servers are taking a quick break. Try again soon",

  SUBMIT_LBL: "Join NoMusic",
  SUBMIT_PENDING_LBL: "Server cat is on it...",
} as const;
