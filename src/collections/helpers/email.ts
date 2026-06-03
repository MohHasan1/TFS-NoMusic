import { EMAIL_ACTION, EMAIL_STATUS } from "../constants/emails";

export function shouldSendEmail(action?: string | null, status?: string | null) {
  if (!action || action === EMAIL_ACTION.NONE) return false;

  const canSend = action === EMAIL_ACTION.SEND && status !== EMAIL_STATUS.SENT;
  const canResend = action === EMAIL_ACTION.RESEND;

  return canSend || canResend;
}
