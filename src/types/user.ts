import type { User } from "#payload-types";

export type TUser = {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  createdAt: User["createdAt"];
  isApproved: User["isApproved"];
  prefAudioLang: User["prefAudioLang"];
  uploadedImageURL: User["uploadedImageURL"];
};
