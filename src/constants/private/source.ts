export const SOURCE_KEYS = {
  LIBRARY_PAGE: (libraryId: string) => `library:page:${libraryId}`,
  NOMUSIC_PAGE: (key?: string) => `nomusic:page:${key}`,
} as const;
