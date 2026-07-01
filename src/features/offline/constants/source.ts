export const OFFLINE_SOURCE_KEYS = {
  NOMUSIC_PAGE: () => "offline:nomusic:page",
  LIBRARY_PAGE: (libraryId: string) => `offline:library:page:${libraryId}`,
} as const;
