import type { User } from "#payload-types";

export type TUser = {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  roles: User["role"];
  isApproved: User["isApproved"];
};
