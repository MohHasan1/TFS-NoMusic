import type { CollectionBeforeChangeHook } from "payload";
import type { Whitelist } from "@/payload-types";
import { render } from "react-email";

import AccessApprovedEmail from "#emails-templates/AccessApprovedEmail";
import InviteEmail from "#emails-templates/InviteEmail";

import { EMAIL_ACTION, EMAIL_STATUS } from "../constants/emails";
import { tryCatchResponse } from "#trycatch-response";
import { PUBLIC_ROUTES } from "#constants/routes";
import { shouldSendEmail } from "../helpers/email";
import { isPreviewOrDevEnv } from "@/lib/env";

export const sendWhitelistEmailBeforeChange: CollectionBeforeChangeHook<Whitelist> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data;

  const emailAction = data.emailAction;
  const emailType = data.emailType;
  const emailStatus = data.emailStatus || originalDoc?.emailStatus;
  const shouldSend = shouldSendEmail(emailAction, emailStatus);
  if (!shouldSend) {
    return {
      ...data,
      emailAction: EMAIL_ACTION.NONE,
    };
  }

  // Prepare email data
  const isInviteEmail = emailType === "invite";
  const name = data.name || originalDoc?.name;
  const email = data.email || originalDoc?.email;
  const signupUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${PUBLIC_ROUTES.SIGNUP}`;
  if (!email) return data;

  const subject = isInviteEmail
    ? "You're invited to join NoMusic 🎧"
    : "Hurray! Your request has been approved 🎉";


  const html = await render(
    isInviteEmail
      ? InviteEmail({ name, inviteUrl: signupUrl, isPrev: isPreviewOrDevEnv() })
      : AccessApprovedEmail({ name, signupUrl, isPrev: isPreviewOrDevEnv() }),
  );

  // Send email
  const sendEmailResponse = await tryCatchResponse(() =>
    req.payload.sendEmail({
      to: email,
      subject,
      html,
    }),
  );

  return {
    ...data,
    emailStatus: sendEmailResponse.isSuccess ? EMAIL_STATUS.SENT : EMAIL_STATUS.FAILED,
    emailAction: EMAIL_ACTION.NONE,
  };
};
