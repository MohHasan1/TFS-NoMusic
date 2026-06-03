import type { CollectionConfig } from "payload";
import { REQUEST_TYPE_OPTIONS } from "./constants/requests";
import { fillUserInfoBeforeValidate, sendRequestEmailBeforeChange } from "./hooks/requests";
import {
  EMAIL_ACTION,
  EMAIL_ACTION_OPTIONS,
  EMAIL_STATUS,
  EMAIL_STATUS_OPTIONS,
} from "./constants/emails";
import { access } from "./access";

export const Requests: CollectionConfig = {
  slug: "requests",

  admin: {
    useAsTitle: "type",
    group: "Requests",
    defaultColumns: ["type", "status", "name", "email"],
  },

  hooks: {
    beforeValidate: [fillUserInfoBeforeValidate],
    beforeChange: [sendRequestEmailBeforeChange],
  },

  access: {
    create: access.isAdmin,
    read: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin,
  },

  fields: [
    {
      type: "collapsible",
      label: "Request Details",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: [...REQUEST_TYPE_OPTIONS],
        },
        {
          name: "status",
          type: "select",
          defaultValue: "pending",
          options: ["pending", "approved", "rejected"],
        },
        {
          name: "message",
          type: "textarea",
        },
        {
          name: "url",
          type: "text",
        },
      ],
    },

    {
      type: "collapsible",
      label: "User Info",
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "email",
          type: "email",
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
