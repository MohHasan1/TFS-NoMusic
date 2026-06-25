import type { CollectionBeforeValidateHook } from "payload";
import type { Library } from "#payload-types";
import slugify from "slugify";

export const generateSlugBeforeValidate: CollectionBeforeValidateHook<Library> = async ({
  data,
  operation,
}) => {
  //
  if (!data) return data;

  //
  if (operation === "create" && data?.name) {
    data.slug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  return data;
};
