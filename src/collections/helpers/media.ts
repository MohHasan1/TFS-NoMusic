import { MEDIA_FOLDERS } from "../constants/media";

export type TMediaFolderValue = (typeof MEDIA_FOLDERS)[number]["value"];

export const DEFAULT_MEDIA_FOLDER: TMediaFolderValue = "vocal";

export const MEDIA_FOLDER_PREFIX = Object.fromEntries(MEDIA_FOLDERS.map((folder) => [folder.value, folder.prefix]));

export const MEDIA_FOLDER_OPTIONS = MEDIA_FOLDERS.map(({ label, value }) => ({
  label,
  value,
}));
