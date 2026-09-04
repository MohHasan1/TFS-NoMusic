import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionBeforeValidateHook } from "payload";
import slugify from "slugify";
import { CACHE_TAG } from "#constants/cache-tags";
import type { Library } from "#payload-types";

export const revalidateLibraryAfterChange: CollectionAfterChangeHook<Library> = ({ doc, previousDoc }) => {
  revalidateTag(CACHE_TAG.LIBRARY.DETAIL(doc.id), "max");
  revalidateTag(CACHE_TAG.LIBRARY.LIST(doc.type), "max");

  if (previousDoc.type !== doc.type) {
    revalidateTag(CACHE_TAG.LIBRARY.LIST(previousDoc.type), "max");
  }
};

export const revalidateLibraryAfterDelete: CollectionAfterDeleteHook<Library> = ({ doc }) => {
  revalidateTag(CACHE_TAG.LIBRARY.DETAIL(doc.id), "max");
  revalidateTag(CACHE_TAG.LIBRARY.LIST(doc.type), "max");
};

export const generateSlugBeforeValidate: CollectionBeforeValidateHook<Library> = async ({ data, operation }) => {
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
