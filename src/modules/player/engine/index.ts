import SubscriberSet, { type Subscriber } from "./SubscriberSet";

export class PlayerEngine {
  private track: TPlayerTrack | null = null;

  private audio: HTMLAudioElement | null = null;

  private endedListeners = new SubscriberSet<void>();
  private playingListeners = new SubscriberSet<boolean>();
  private volumeListeners = new SubscriberSet<number>();
  private bufferingListeners = new SubscriberSet<boolean>();
  private timeUpdateListeners = new SubscriberSet<number>();
  private durationListeners = new SubscriberSet<number>();
  private errorListeners = new SubscriberSet<string | null>();

  constructor() {
    if (typeof window === "undefined") return;

    this.audio = new Audio();
    this.audio.preload = "metadata";

    // -- Publish native audio events to engine subscribers (like pub-sub) -- //
    this.audio.addEventListener("timeupdate", () => {
      this.timeUpdateListeners.emit(this.getCurrentTime());
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.durationListeners.emit(this.getDuration());
    });

    this.audio.addEventListener("durationchange", () => {
      this.durationListeners.emit(this.getDuration());
    });

    this.audio.addEventListener("volumechange", () => {
      this.volumeListeners.emit(this.getVolume());
    });

    this.audio.addEventListener("ended", () => {
      this.playingListeners.emit(false);
      this.endedListeners.emit();
    });

    this.audio.addEventListener("waiting", () => {
      this.bufferingListeners.emit(true);
    });

    this.audio.addEventListener("playing", () => {
      this.bufferingListeners.emit(false);
      this.playingListeners.emit(true);
      this.errorListeners.emit(null);
    });

    this.audio.addEventListener("canplay", () => {
      this.bufferingListeners.emit(false);
    });

    this.audio.addEventListener("pause", () => {
      this.playingListeners.emit(false);
    });

    this.audio.addEventListener("error", () => {
      this.bufferingListeners.emit(false);
      this.playingListeners.emit(false);
      this.errorListeners.emit("Couldn't play this track. The audio source may be unavailable.");
    });
  }

  private loadTrack(track: TPlayerTrack) {
    if (!this.audio) return;

    const nextSource = new URL(track.src, window.location.href).href;
    const isSameSource = this.audio.src === nextSource;

    this.track = track;

    if (isSameSource) return;

    this.audio.src = nextSource;
    this.audio.currentTime = 0;
    this.durationListeners.emit(0);
  }

  // Playback controls
  play(track: TPlayerTrack, options: TPlayOptions = {}) {
    if (!this.audio) return;

    this.loadTrack(track);
    if (!this.audio.src) return;

    if (options.restart) {
      this.audio.currentTime = 0;
    }

    return this.audio.play();
  }

  pause() {
    if (!this.audio) return;

    this.audio.pause();
  }

  resume() {
    if (!this.audio) return;

    this.audio.play();
  }

  toggle() {
    if (!this.audio) return;

    if (this.audio.paused) {
      return this.audio.play();
    }

    this.audio.pause();
  }

  seekTo(time: number) {
    if (!this.audio) return;

    this.audio.currentTime = time;
  }

  // Volume controls
  setVolume(volume: number) {
    if (!this.audio) return;

    this.audio.volume = volume;
  }

  getVolume() {
    return this.audio?.volume ?? 1;
  }

  // Track state getters
  getCurrentTrack() {
    return this.track;
  }

  // Playback state getters
  getCurrentTime() {
    return this.audio?.currentTime ?? 0;
  }

  getDuration() {
    return this.audio?.duration ?? 0;
  }

  getIsPlaying() {
    return this.audio ? !this.audio.paused : false;
  }

  // Event subscriptions
  subscribeTimeUpdate(cb: Subscriber<number>) {
    return this.timeUpdateListeners.add(cb);
  }

  subscribeDuration(cb: Subscriber<number>) {
    return this.durationListeners.add(cb);
  }

  subscribeEnded(cb: Subscriber<void>) {
    return this.endedListeners.add(cb);
  }

  subscribeBuffering(cb: Subscriber<boolean>) {
    return this.bufferingListeners.add(cb);
  }

  subscribePlaying(cb: Subscriber<boolean>) {
    return this.playingListeners.add(cb);
  }

  subscribeVolume(cb: Subscriber<number>) {
    return this.volumeListeners.add(cb);
  }

  subscribeError(cb: Subscriber<string | null>) {
    return this.errorListeners.add(cb);
  }
}

export const playerEngine = new PlayerEngine();

export type TPlayerTrack = {
  id: string;
  src: string;
};

export type TPlayOptions = { restart?: boolean };

// NOTE:
// playback = playing, pausing, seeking, volume, current time
// track = song data like id, src, title, artist, cover

// NOTE: audio event -> engine emit -> subscribed function runs -> Zustand updates -> UI updates
// 1. Constructor creates audio element
// 2. Constructor connects audio events to set's emit()
//    audio "playing"  -> playingListeners.emit(true)
//    audio "pause"    -> playingListeners.emit(false)
//    audio "timeupdate" -> timeUpdateListeners.emit(time)
// 3. subscribe methods connect your functions to those listener sets
// 4. When audio event happens, emit() runs all connected functions
// 5. Those functions update Zustand
// 6. React UI updates from Zustand
