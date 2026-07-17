import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from "payload";
import slugify from "slugify";
import { isID } from "#lib/utils";
import type { Library } from "#payload-types";
import { CACHE_TAG } from "#constants/cache-tags";

export const revalidateLibraryAfterChange: CollectionAfterChangeHook<Library> = ({
  doc,
  previousDoc,
}) => {
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

export const syncUploadImageURLBeforeValidate: CollectionBeforeValidateHook<Library> = async ({
  data,
  req,
}) => {
  if (!data?.imageFile) return data;
  if (data.uploadedImageURL) return data;

  const imageFile = data.imageFile;

  if (typeof imageFile === "object" && imageFile !== null && "url" in imageFile) {
    const mediaURL = typeof imageFile.url === "string" ? imageFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      uploadedImageURL: mediaURL,
    };
  }

  if (isID(imageFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: imageFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      uploadedImageURL: media.url,
    };
  }

  return data;
};
