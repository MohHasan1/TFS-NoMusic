import type { Library } from "#payload-types";

export type TLibrary = {
  id: Library["id"];
  name: Library["name"];
  slug: Library["slug"];
  type: Library["type"];
  updatedAt: Library["updatedAt"];
  trackCount: Library["trackCount"];
  description: Library["description"];
  uploadedImageURL: Library["uploadedImageURL"];
};
