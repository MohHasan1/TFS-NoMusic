export type BrowsableNoMusicDTO = {
  id: number;
  title: string;
  artist?: string;
  album?: string;
  duration?: number;
  genre?: string;
  language?: string;
  streamURL: string;
  coverURL?: string;
};
