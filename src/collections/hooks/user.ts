import type { CollectionBeforeChangeHook } from "payload";
import type { User } from "@/payload-types";
import { render } from "react-email";

import { EMAIL_ACTION, EMAIL_STATUS } from "../constants/emails";
import WelcomeEmail from "#emails-templates/WelcomeEmail";
import { tryCatchResponse } from "#trycatch-response";
import { PRIVATE_ROUTES } from "#constants/routes";
import { shouldSendEmail } from "../helpers/email";
import { isPreviewOrDevEnv } from "@/lib/env";

export const sendWelcomeEmailBeforeChange: CollectionBeforeChangeHook<User> = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (!data) return data;

  // Do not send on first signup create
  if (operation === "create") return data;

  // User must already be verified
  const isVerified = data._verified === true || originalDoc?._verified === true;
  if (!isVerified) return data;

  // Check email action
  const emailAction = data.emailAction ?? originalDoc?.emailAction;
  const emailStatus = data.emailStatus ?? originalDoc?.emailStatus;

  const shouldSend = shouldSendEmail(emailAction, emailStatus);
  if (!shouldSend) {
    return {
      ...data,
      emailAction: EMAIL_ACTION.NONE,
    };
  }

  // Prepare email data
  const name = data.name || originalDoc?.name || "there";
  const email = data.email || originalDoc?.email;
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${PRIVATE_ROUTES.NOMUSIC}`;

  if (!email) {
    return {
      ...data,
      emailStatus: EMAIL_STATUS.FAILED,
      emailAction: EMAIL_ACTION.NONE,
    };
  }

  // Render welcome email
  const html = await render(WelcomeEmail({ name, url, isPrev: isPreviewOrDevEnv() }));

  // Send email
  const sendEmailResponse = await tryCatchResponse(() =>
    req.payload.sendEmail({
      to: email,
      subject: "Welcome to NoMusic! 🎧",
      html,
    }),
  );

  return {
    ...data,
    emailAction: EMAIL_ACTION.NONE,
    emailStatus: sendEmailResponse.isSuccess ? EMAIL_STATUS.SENT : EMAIL_STATUS.FAILED,
  };
};
