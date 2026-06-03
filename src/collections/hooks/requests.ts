import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from "payload";
import RequestedNoMusicAddedEmail from "#emails-templates/RequestedNoMusicAddedEmail";
import { EMAIL_ACTION, EMAIL_STATUS } from "../constants/emails";
import { tryCatchResponse } from "#trycatch-response";
import { shouldSendEmail } from "../helpers/email";
import { PRIVATE_ROUTES } from "#constants/routes";
import { Request } from "#payload-types";
import { render } from "react-email";
import { isPreviewOrDevEnv } from "@/lib/env";

export const fillUserInfoBeforeValidate: CollectionBeforeValidateHook<Request> = async ({
  data,
  operation,
  req,
}) => {
  if (!data || data.type !== "nomusic_request" || operation === "update") return data;

  const user = req.user;
  const email = typeof user?.email === "string" ? user.email : undefined;
  const name = typeof user?.name === "string" ? user.name : undefined;
  const resolvedEmail = email || data.email;

  return {
    ...data,
    email: resolvedEmail,
    name: name,
  };
};

export const sendRequestEmailBeforeChange: CollectionBeforeChangeHook<Request> = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (!data) return data;

  // Only admin updates should send request emails
  if (operation === "create") return data;

  // Only send for approved NoMusic requests
  const requestType = data.type || originalDoc?.type;
  const requestStatus = data.status || originalDoc?.status;
  if (requestType !== "nomusic_request" || requestStatus !== "approved") return data;

  // Check email action
  const emailAction = data.emailAction;
  const emailStatus = data.emailStatus || originalDoc?.emailStatus;
  const shouldSend = shouldSendEmail(emailAction, emailStatus);
  if (!shouldSend) {
    return {
      ...data,
      emailAction: EMAIL_ACTION.NONE,
    };
  }

  // Prepare email data
  const name = data.name || originalDoc?.name;
  const email = data.email || originalDoc?.email;
  const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${PRIVATE_ROUTES.NOMUSIC}`;
  if (!email) {
    return {
      ...data,
      emailStatus: EMAIL_STATUS.FAILED,
      emailAction: EMAIL_ACTION.NONE,
    };
  }

  const html = await render(
    RequestedNoMusicAddedEmail({ name, returnUrl, isPrev: isPreviewOrDevEnv() }),
  );
  const sendEmailResponse = await tryCatchResponse(() =>
    req.payload.sendEmail({
      to: email,
      subject: "Your NoMusic request was accepted",
      html,
    }),
  );

  return {
    ...data,
    emailStatus: sendEmailResponse.isSuccess ? EMAIL_STATUS.SENT : EMAIL_STATUS.FAILED,
    emailAction: EMAIL_ACTION.NONE,
  };
};
