// src/access/index.ts
import { logInfo } from "#loggers";
import type { Access } from "payload";

/**
 * Public access
 */
export const anyone: Access = () => {
  return true;
};

export const noOne: Access = () => {
  return false;
};

/**
 * Auth access
 */
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

/**
 * Self access
 * Best for Users collection.
 *
 * Example:
 * user.id === document id
 */
export const isSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false;

  return user.id === id;
};

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false;

  if (user.role === "admin") return true;

  return user.id === id;
};

/**
 * Own document access
 * Best for collections that have a relationship field named "user".
 *
 * Example document:
 * {
 *   user: "user-id-here"
 * }
 */
export const isOwnDoc: Access = ({ req: { user } }) => {
  if (!user) return false;

  return {
    user: {
      equals: user.id,
    },
  };
};

export const isAdminOrOwnDoc: Access = ({ req: { user } }) => {
  if (!user) return false;

  if (user.role === "admin") return true;

  return {
    user: {
      equals: user.id,
    },
  };
};

/**
 * Grouped access object
 */
export const access = {
  anyone,
  noOne,

  isLoggedIn,
  isAdmin,

  isSelf,
  isAdminOrSelf,

  isOwnDoc,
  isAdminOrOwnDoc,
};
