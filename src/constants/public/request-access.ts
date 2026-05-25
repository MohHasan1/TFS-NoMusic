import { PUBLIC_ROUTES } from "#constants/routes";

export const REQUEST_ACCESS_CONST = {
  FORM_ID: "request-access-form",
} as const;

export const REQUEST_ACCESS_CLIENT = {
  FORM_TITLE: "Request Access 🐾",
  FORM_DESC: "Ask for an invite to our private NoMusic circle.",

  NAME_LBL: "Your name",
  NAME_PLACEHOLDER: "Pop in your name",
  VALIDATION_MIN_NAME_ERROR: "Give me a little more name to work with.",
  VALIDATION_MAX_NAME_ERROR: "That name is a bit too long for the guest list.",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Where should the invite go?",
  VALIDATION_EMAIL_ERROR: "That email looks a little lost. Try checking it again.",

  FALLBACK_INVALID_REQUEST: "Something about this request looks off. Please check your details.",

  SUCCESS_ALERT_TITLE: "Yayy.. Request sent! 🐾",
  SUCCESS_SUBMIT_MSG:
    "Hold tight! Your request made it to the server cat 🐾 We'll review it soon. Keep an eye on your mailbox for the signup email.",

  ERROR_ALERT_TITLE: "Oppss.. Could not send request:",
  ERROR_SUBMIT_MSG:
    "Looks like the server cat did not receive your invite request. Please try again.",

  FALLBACK_CLIENT_ERROR: "The server cat ran into a little issue. Please try again.",
  FALLBACK_SERVER_ERROR: "The server cat is a bit busy right now. Please try again shortly.",

  SUBMIT_LBL: "Request Access",
  SUBMIT_PENDING_LBL: "Requesting Access…",

  CTA_LBL: "Already have an account?",
  CTA_LINK_LBL: "Sign in",
  CTA_HREF: PUBLIC_ROUTES.SIGNIN,
} as const;
