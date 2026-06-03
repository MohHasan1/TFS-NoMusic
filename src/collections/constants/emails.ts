export const EMAIL_STATUS = {
  NOT_SENT: "not_sent",
  SENT: "sent",
  FAILED: "failed",
} as const;

export const EMAIL_ACTION = {
  NONE: "none",
  SEND: "send",
  RESEND: "resend",
} as const;

export const EMAIL_STATUS_OPTIONS = [
  {
    label: "Not Sent",
    value: EMAIL_STATUS.NOT_SENT,
  },
  {
    label: "Sent",
    value: EMAIL_STATUS.SENT,
  },
  {
    label: "Failed",
    value: EMAIL_STATUS.FAILED,
  },
];

export const EMAIL_ACTION_OPTIONS = [
  {
    label: "None",
    value: EMAIL_ACTION.NONE,
  },
  {
    label: "Send",
    value: EMAIL_ACTION.SEND,
  },
  {
    label: "Resend",
    value: EMAIL_ACTION.RESEND,
  },
];
