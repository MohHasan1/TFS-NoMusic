import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";
import { playerEngine } from "../engine";

class PlayerController {
  private initialized = false;

  private init() {
    if (this.initialized) return;
    this.initialized = true;

    playerEngine.subscribePlaying((isPlaying) => {
      store.getState().setIsPlaying(isPlaying);
    });

    playerEngine.subscribeBuffering((isBuffering) => {
      store.getState().setIsBuffering(isBuffering);
    });

    playerEngine.subscribeError((error) => {
      store.getState().setError(error);
    });

    playerEngine.subscribeTimeUpdate((currentTime) => {
      store.getState().setCurrentTime(currentTime);
    });

    playerEngine.subscribeDuration((duration) => {
      store.getState().setDuration(duration);
    });

    playerEngine.subscribeEnded(() => {
      store.getState().setIsPlaying(false);
      store.getState().setCurrentTime(0);
    });
  }

  playTrack(track: TNoMusic) {
    this.init();

    const { currentTrack, isPlaying, setCurrentTrack, setIsBuffering, setError } = store.getState();

    if (currentTrack?.id === track.id && isPlaying) {
      playerEngine.pause();
      return;
    }

    if (currentTrack?.id === track.id && !isPlaying) {
      playerEngine.resume();
      return;
    }

    setCurrentTrack(track);
    setIsBuffering(true);
    setError(null);

    return playerEngine.play({
      id: track.id,
      src: track.audioStreamUrl,
    });
  }

  pauseTrack() {
    this.init();

    playerEngine.pause();
  }

  resumeTrack() {
    this.init();

    playerEngine.resume();
  }

  togglePlayback() {
    this.init();

    playerEngine.toggle();
  }

  seekTrack(time: number) {
    this.init();

    playerEngine.seekTo(time);
  }

  setVolume(volume: number) {
    this.init();

    playerEngine.setVolume(volume);
    store.getState().setVolume(volume);
  }
}

export const playerController = new PlayerController();
