import type { TPlaylistDetail } from "../../types/playlist";
import { PlaylistAudioBrowser } from "../elements/PlaylistAudioBrowser";
import { PlaylistAudioEmptyBox } from "../elements/PlaylistAudioEmptyBox";

export function PlaylistAudioSection({ playlist }: TProps) {
  const { tracks } = playlist;

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_28px_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_28px_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden text-center md:col-start-3 md:block">Language</span>
          <span aria-hidden="true" className="hidden md:col-start-4 md:block" />
          <span className="col-start-4 text-right md:col-start-5">Time</span>
        </div>
        {tracks.length === 0 ? (
          <PlaylistAudioEmptyBox />
        ) : (
          <PlaylistAudioBrowser playlistId={playlist.id} tracks={tracks} />
        )}
      </div>
    </section>
  );
}

type TProps = {
  playlist: TPlaylistDetail;
};
