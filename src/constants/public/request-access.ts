export const REQUEST_ACCESS_CONST = {
  FORM_ID: "request-access-form",
} as const;

export const REQUEST_ACCESS_CLIENT = {
  FORM_TITLE: "Request Access",
  FORM_DESC: "Let's get you back to the voices you love.",

  NAME_LBL: "Full name",
  NAME_PLACEHOLDER: "Pop in your name",
  VALIDATION_MIN_NAME_ERROR: "Name must be at least 3 characters long.",
  VALIDATION_MAX_NAME_ERROR: "Name must be less than 25 characters long.",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Pop in your email",
  VALIDATION_EMAIL_ERROR: "Hmm… that email sounds a bit off-key",

  SUCESSFULL_SUBMIT_MSG: "Request submitted. We will review and add it if available.",

  FALLBACK_ERROR: "Something went wrong. Please try again.",
  FALLBACK_WRONG_CREDENTIALS: "Something went wrong. Please try again.",
  FALLBACK_SERVER_ERROR: "Something went wrong. Please try again.",

  SUBMIT_LBL: "Request Access",
  SUBMIT_PENDING_LBL: "Requesting Access…",

  ERROR_ALERT_TITLE: "Oops! Something went wrong.",
  SUCCESS_ALERT_TITLE: "Success!",

  CTA_LBL: "Already have access?",
  CTA_LINK_LBL: "Sign in",
  CTA_HREF: "/signin",
} as const;
