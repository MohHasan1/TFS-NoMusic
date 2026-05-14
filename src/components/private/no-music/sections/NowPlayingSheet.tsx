"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNoMusicPlaybackController } from "@/features/nomusic/hook.noMusicPlaybackController";
import { useNoMusicQueue } from "@/features/nomusic/noMusicQueue/hook.noMusicQueue";
import { useNowPlaying } from "@/features/nomusic/nowPlaying/hook.nowPlaying";

import { nextRepeatMode } from "../utils/repeatMode";
import { NowPlayingContent } from "./NowPlayingContent";
import { NowPlayingHeader } from "./NowPlayingHeader";

export function NowPlayingSheet() {
  const playback = useNoMusicPlaybackController();
  const { shuffle, repeatMode, setShuffle, setRepeatMode } = useNoMusicQueue();
  const { isOpen, setOpen, close } = useNowPlaying();

  const { currentTrack } = playback;
  if (!currentTrack) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <NowPlayingHeader onClose={close} />

          <DialogTitle className="sr-only">{currentTrack.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {currentTrack.artist || "Unknown Artist"}
          </DialogDescription>

          <NowPlayingContent
            track={currentTrack}
            isPlaying={playback.isPlaying}
            isBuffering={playback.isBuffering}
            currentTime={playback.currentTime}
            duration={playback.duration}
            volume={playback.volume}
            shuffle={shuffle}
            repeatMode={repeatMode}
            onTogglePlay={playback.togglePlayback}
            onPrevious={playback.playPrevTrack}
            onNext={playback.playNextTrack}
            onSeek={playback.seek}
            onVolumeChange={playback.setVolume}
            onToggleShuffle={() => setShuffle(!shuffle)}
            onCycleRepeat={() => setRepeatMode(nextRepeatMode(repeatMode))}
          />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
