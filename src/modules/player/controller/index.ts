import { store } from "#store";
import { TNoMusic } from "#types/nomusic";
import { playerEngine } from "../engine";

class PlayerController {
  private initialized = false;

  /**
   * Initializes player engine subscriptions.
   *
   * This method is idempotent and will only run once.
   *
   * Subscribes to:
   * - playback state changes
   * - buffering state changes
   * - playback errors
   * - current time updates
   * - duration updates
   * - volume updates
   * - track end events
   *
   * Updates the global store in response to player engine events.
   *
   * @returns void
   */
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

    playerEngine.subscribeVolume((volume) => {
      store.getState().setVolume(volume);
    });

    playerEngine.subscribeEnded(() => {
      store.getState().setIsPlaying(false);
      store.getState().setCurrentTime(0);
    });
  }

  /**
   * Plays a track or toggles playback for the currently selected track.
   *
   * Behavior:
   * - If the same track is already playing, playback is paused.
   * - If the same track is paused, playback resumes.
   * - If a different track is selected, the current track is replaced and played.
   *
   * @param track - The track to play.
   * @returns A promise from `playerEngine.play()` when starting a new track,
   * otherwise `undefined` when toggling pause/resume.
   */
  playTrack(track: TNoMusic) {
    this.init();

    const { currentTrack, isPlaying, setCurrentTrack, setIsBuffering, setError } = store.getState();

    if (currentTrack?.id === track.id && isPlaying) {
      playerEngine.pause();
      return undefined;
    }

    if (currentTrack?.id === track.id && !isPlaying) {
      playerEngine.resume();
      return undefined;
    }

    setCurrentTrack(track);
    setIsBuffering(true);
    setError(null);

    return playerEngine.play({
      id: track.id,
      src: track.audioStreamUrl,
    });
  }

  /**
   * Pauses the currently playing track.
   *
   * @returns void
   */
  pauseTrack() {
    this.init();
    playerEngine.pause();
  }

  /**
   * Resumes the currently paused track.
   *
   * @returns void
   */
  resumeTrack() {
    this.init();
    playerEngine.resume();
  }

  /**
   * Toggles playback state for the current track.
   *
   * - Plays if paused.
   * - Pauses if currently playing.
   *
   * @returns void
   */
  togglePlayback() {
    this.init();
    playerEngine.toggle();
  }

  /**
   * Seeks the current track to a specific playback position.
   *
   * @param time - The playback position in seconds.
   * @returns void
   */
  seekTrackTo(time: number) {
    this.init();
    playerEngine.seekTo(time);
  }

  /**
   * Sets the playback volume.
   *
   * @param volume - Volume level between 0 and 1.
   * @returns void
   */
  setVolume(volume: number) {
    this.init();
    playerEngine.setVolume(volume);
  }

  subscribeTrackEnded(fn: () => void) {
    playerEngine.subscribeEnded(() => {
      fn();
    });
  }
}

export const playerController = new PlayerController();
