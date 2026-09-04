import type { Access, Where } from "payload";

/**
 * Read a playlist if you're an admin, its owner, or it's not private.
 */
const canRead: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  const where: Where = {
    or: [{ user: { equals: user.id } }, { visibility: { not_equals: "private" } }],
  };

  return where;
};

export const playlistAccess = {
  canRead,
};
