export const SOURCE_KEYS = {
  NOMUSIC_PAGE: (key?: string) => `nomusic:page:${key}`,
  LIBRARY_PAGE: (libraryId: string) => `library:page:${libraryId}`,
} as const;
