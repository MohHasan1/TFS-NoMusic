export const REQUEST_NOMUSIC_CONST = {
  FORM_ID: "request-nomusic-form",
} as const;

export const REQUEST_NOMUSIC_CLIENT = {
  FORM_TITLE: "Request NoMusic",
  FORM_DESC: "Share a YouTube link and we will review it for the library.",

  URL_LBL: "YouTube URL",
  URL_PLACEHOLDER: "https://youtube.com/watch?v=...",
  VALIDATION_URL_REQUIRED: "A YouTube URL is required.",
  VALIDATION_URL_ERROR: "Please enter a valid YouTube URL.",

  SUCCESS_SUBMIT_MSG: "Request submitted. We will review and add it if available.",

  FALLBACK_ERROR: "Something went wrong. Please try again.",
  FALLBACK_WRONG_CREDENTIALS: "Something went wrong. Please try again.",
  FALLBACK_SERVER_ERROR: "Unable to submit song request right now. Please try again.",

  SUBMIT_LBL: "Submit Request",
  SUBMIT_PENDING_LBL: "Submitting Request...",

  ERROR_ALERT_TITLE: "Request could not be submitted:",
  SUCCESS_ALERT_TITLE: "Request submitted!",
} as const;
