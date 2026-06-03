import {
  EMAIL_STATUS,
  EMAIL_STATUS_OPTIONS,
  EMAIL_ACTION,
  EMAIL_ACTION_OPTIONS,
} from "./constants/emails";
import { access } from "./access";
import type { CollectionConfig } from "payload";
import { sendEmailBeforeChange } from "./hooks/whitelist";

export const Whitelist: CollectionConfig = {
  slug: "whitelist",

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "emailStatus"],
  },

  access: {
    read: access.isAdmin,
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  hooks: { beforeChange: [sendEmailBeforeChange] },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      type: "collapsible",
      label: "Email Settings",
      fields: [
        {
          name: "emailType",
          type: "select",
          required: true,
          options: [
            {
              label: "Invite Email",
              value: "invite",
            },
            {
              label: "Access Approved Email",
              value: "access_approved",
            },
          ],
        },
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
