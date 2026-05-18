import type { CollectionBeforeValidateHook } from "payload";
import slugify from "slugify";
import type { Library } from "#payload-types";
import { VALIDATORS } from "../constants/libraries";

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

export const validateLibraryBeforeValidate: CollectionBeforeValidateHook<Library> = async ({ data }) => {
  if (!data) return data;
  if (!data.type) throw new Error(`Library type is required.`);

  const config = VALIDATORS[data.type];

  if (!config) return data;

  const type = config.type;
  const value = data[type];

  if (!value) {
    throw new Error(`${type} is required for ${data.type}`);
  }

  if (!includesValue(config.values, value)) {
    throw new Error(`Invalid ${type} for ${data.type}`);
  }

  return data;
};

function includesValue(values: readonly string[], value: unknown) {
  return typeof value === "string" && values.includes(value);
}
