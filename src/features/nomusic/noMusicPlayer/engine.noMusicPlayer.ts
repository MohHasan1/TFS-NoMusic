export type EngineTrack = {
  id: string | number;
  url: string;
  title: string;
};

export type PlayOptions = { restart?: boolean };

type Subscriber<T> = (value: T) => void;

class SubscriberSet<T> {
  private set = new Set<Subscriber<T>>();

  add(cb: Subscriber<T>) {
    this.set.add(cb);
    return () => {
      this.set.delete(cb);
    };
  }

  emit(value: T) {
    this.set.forEach((cb) => cb(value));
  }
}

/**
 * Browser-only audio engine. Owns a single `HTMLAudioElement` and exposes a
 * narrow, intent-based API. UI state lives in the Zustand store; the engine
 * only emits events and runs DOM side-effects.
 */
export class NoMusicEngine {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: EngineTrack | null = null;

  private timeUpdate = new SubscriberSet<number>();
  private ended = new SubscriberSet<void>();
  private buffering = new SubscriberSet<boolean>();
  private playState = new SubscriberSet<boolean>();
  private error = new SubscriberSet<string | null>();

  constructor() {
    if (typeof window === "undefined") return;

    this.audio = new Audio();
    this.audio.preload = "metadata";

    this.audio.addEventListener("timeupdate", () => {
      this.timeUpdate.emit(this.audio?.currentTime ?? 0);
    });
    this.audio.addEventListener("ended", () => {
      this.ended.emit();
    });
    this.audio.addEventListener("waiting", () => {
      this.buffering.emit(true);
    });
    this.audio.addEventListener("playing", () => {
      this.buffering.emit(false);
      this.playState.emit(true);
      this.error.emit(null);
    });
    this.audio.addEventListener("canplay", () => {
      this.buffering.emit(false);
    });
    this.audio.addEventListener("pause", () => {
      this.playState.emit(false);
    });
    this.audio.addEventListener("error", () => {
      this.buffering.emit(false);
      this.error.emit("Couldn't play this track. The audio source may be unavailable.");
    });
  }

  play(track?: EngineTrack, options: PlayOptions = {}) {
    if (!this.audio) return;

    if (track) {
      this.loadTrack(track, options.restart === true);
    }

    if (!this.audio.src) return;
    return this.audio.play();
  }

  pause() {
    this.audio?.pause();
  }

  toggle() {
    if (!this.audio) return;
    return this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  seek(time: number) {
    if (!this.audio) return;
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    if (!this.audio) return;
    this.audio.volume = volume;
  }

  getTime() {
    return this.audio?.currentTime ?? 0;
  }

  getDuration() {
    return this.audio?.duration ?? 0;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  isPlaying() {
    return this.audio ? !this.audio.paused : false;
  }

  subscribeTimeUpdate(cb: Subscriber<number>) {
    return this.timeUpdate.add(cb);
  }

  subscribeEnded(cb: Subscriber<void>) {
    return this.ended.add(cb);
  }

  subscribeBuffering(cb: Subscriber<boolean>) {
    return this.buffering.add(cb);
  }

  subscribePlayState(cb: Subscriber<boolean>) {
    return this.playState.add(cb);
  }

  subscribeError(cb: Subscriber<string | null>) {
    return this.error.add(cb);
  }

  private loadTrack(track: EngineTrack, restart: boolean) {
    if (!this.audio) return;

    const nextSource = new URL(track.url, window.location.href).href;
    const isSameSource = this.audio.src === nextSource;
    this.currentTrack = track;

    if (!isSameSource) {
      this.audio.src = nextSource;
      this.audio.currentTime = 0;
      return;
    }

    // Same source: only rewind if the caller explicitly asks (e.g. queue advance).
    if (restart) {
      this.audio.currentTime = 0;
    }
  }
}

export const noMusicEngine = new NoMusicEngine();
