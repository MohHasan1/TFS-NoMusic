export const MEDIA_FOLDERS = [
  { label: "Vocal", value: "vocal", prefix: "nomusic/vocal" },
  {
    label: "Images / Users",
    value: "images/users",
    prefix: "nomusic/images/users",
  },
  {
    label: "Images / Vocals",
    value: "images/vocals",
    prefix: "nomusic/images/vocals",
  },
  {
    label: "Images / Playlist",
    value: "images/playlist",
    prefix: "nomusic/images/playlist",
  },
] as const;

export type TMediaFolderValue = (typeof MEDIA_FOLDERS)[number]["value"];

export const DEFAULT_MEDIA_FOLDER: TMediaFolderValue = "vocal";

export const MEDIA_FOLDER_PREFIX = Object.fromEntries(
  MEDIA_FOLDERS.map((folder) => [folder.value, folder.prefix]),
);

export const MEDIA_FOLDER_OPTIONS = MEDIA_FOLDERS.map(({ label, value }) => ({
  label,
  value,
}));
