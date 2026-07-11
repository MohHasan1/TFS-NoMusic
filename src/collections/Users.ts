import type { CollectionConfig } from "payload";
import { render } from "react-email";
import { LANGUAGES_VALUES } from "#constants/private/nomusic-language";
import ResetPasswordEmail from "#emails-templates/ResetPasswordEmail";
import VerifyEmail from "#emails-templates/VerifyEmail";
import { capitalizeFirstLetter } from "#lib/utils";
import { ROLE_OPTIONS } from "@/collections/constants/roles";
import { isPreviewOrDevEnv } from "@/lib/env";
import type { User } from "@/payload-types";
import { access } from "./access";
import { EMAIL_ACTION, EMAIL_ACTION_OPTIONS, EMAIL_STATUS, EMAIL_STATUS_OPTIONS } from "./constants/emails";
import { syncUploadImageURLBeforeValidate } from "./hooks/Libraries";
import { sendWelcomeEmailBeforeChange } from "./hooks/user";

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    verify: {
      generateEmailHTML: async ({ token, user }) => {
        const userName = (user as User)?.name;
        const verificationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}&userId=${user.id}`;
        return await render(VerifyEmail({ userName, verificationUrl, isPrev: isPreviewOrDevEnv() }));
      },
    },
    forgotPassword: {
      generateEmailHTML: async (args) => {
        const user = args?.user as User;
        const token = args?.token;
        const userName = user.name;
        const resetUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`;
        return await render(ResetPasswordEmail({ userName, resetUrl, isPrev: isPreviewOrDevEnv() }));
      },
    },
    tokenExpiration: 60 * 60 * 24 * 30,
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },

  admin: {
    group: "Auth",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "emailStatus"],
  },

  hooks: {
    beforeChange: [sendWelcomeEmailBeforeChange],
    beforeValidate: [syncUploadImageURLBeforeValidate],
  },

  defaultPopulate: {
    id: true,
    name: true,
    email: true,
    role: true,
    isApproved: true,
    createdAt: true,
    prefAudioLang: true,
  },

  access: {
    create: access.isAdmin,
    read: access.isAdminOrSelf,
    update: access.isAdminOrSelf,
    delete: access.isAdmin,
  },

  fields: [
    {
      type: "collapsible",
      label: "User Details",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "select",
          defaultValue: "user",
          options: [...ROLE_OPTIONS],
        },
        {
          name: "isApproved",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },

    {
      type: "collapsible",
      label: "User Preferneces",
      fields: [
        {
          name: "prefAudioLang",
          type: "select",
          options: LANGUAGES_VALUES.map((lang) => ({
            label: capitalizeFirstLetter(lang),
            value: lang,
          })),
        },
      ],
    },

    {
      label: "coverImage",
      type: "collapsible",
      fields: [
        {
          name: "imageFile",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "uploadedImageURL",
          type: "text",
        },
      ],
    },

    {
      type: "collapsible",
      label: "Email Settings",
      fields: [
        {
          name: "emailAction",
          type: "select",
          defaultValue: EMAIL_ACTION.NONE,
          options: EMAIL_ACTION_OPTIONS,
        },
        {
          name: "emailStatus",
          type: "select",
          defaultValue: EMAIL_STATUS.NOT_SENT,
          options: EMAIL_STATUS_OPTIONS,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
};
