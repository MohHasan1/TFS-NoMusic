import type { CollectionBeforeValidateHook } from "payload";
import slugify from "slugify";
import type { Library } from "#payload-types";

export const generateSlugBeforeValidate: CollectionBeforeValidateHook<Library> = async ({ data, operation }) => {
  if (operation === "create" && data?.name) {
    data.slug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  return data;
};
