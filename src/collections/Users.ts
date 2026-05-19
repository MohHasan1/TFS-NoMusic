import type { CollectionConfig } from "payload";
import { render } from "react-email";

import ResetPasswordEmail from "#emails-templates/ResetPasswordEmail";
import VerifyEmail from "#emails-templates/VerifyEmail";
import { ROLE_OPTIONS } from "@/collections/constants/roles";
import type { User } from "@/payload-types";

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    verify: {
      generateEmailHTML: async ({ token, user }) => {
        const userName = (user as User)?.name;
        const verificationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`;
        return await render(VerifyEmail({ userName, verificationUrl }));
      },
    },
    forgotPassword: {
      generateEmailHTML: async (args) => {
        const user = args?.user as User;
        const token = args?.token;
        const userName = user.name;
        const resetUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`;
        return await render(ResetPasswordEmail({ userName, resetUrl }));
      },
    },
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },

  admin: {
    useAsTitle: "name",
  },

  defaultPopulate: {
    id: true,
    name: true,
    email: true,
    role: true,
    isApproved: true,
  },

  // TODO: improve this
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "isApproved",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "role",
      type: "select",
      defaultValue: "user",
      options: [...ROLE_OPTIONS],
    },
  ],
};
