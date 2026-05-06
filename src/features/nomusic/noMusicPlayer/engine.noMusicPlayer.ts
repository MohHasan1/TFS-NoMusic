export class NoMusicEngine {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: Track | null = null;
  private timeUpdateHandlers = new Set<(t: number) => void>();
  private endedHandlers = new Set<() => void>();

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio();

      this.audio.addEventListener("timeupdate", () => {
        const time = this.audio?.currentTime ?? 0;
        this.timeUpdateHandlers.forEach((cb) => {
          cb(time);
        });
      });

      this.audio.addEventListener("ended", () => {
        this.endedHandlers.forEach((cb) => {
          cb();
        });
      });
    }
  }

  private loadTrack(track: Track) {
    if (!this.audio) return;

    const nextSource = new URL(track.url, window.location.href).href;
    const isSameSource = this.audio.src === nextSource;
    this.currentTrack = track;

    if (!isSameSource) {
      this.audio.src = nextSource;
    }

    this.audio.currentTime = 0;
  }

  play(track?: Track) {
    if (!this.audio) return;

    if (track) {
      this.loadTrack(track);
    }

    if (!this.audio.src) return;
    return this.audio.play();
  }

  pause() {
    if (!this.audio) return;

    this.audio.pause();
  }

  toggle() {
    if (!this.audio) return;

    if (this.audio.paused) {
      return this.audio.play();
    }
    this.audio.pause();
  }

  seek(time: number) {
    if (!this.audio) return;

    this.audio.currentTime = time;
  }

  setVolume(v: number) {
    if (!this.audio) return;

    this.audio.volume = v;
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

  subscribeTimeUpdate(cb: (t: number) => void) {
    this.timeUpdateHandlers.add(cb);

    return () => {
      this.timeUpdateHandlers.delete(cb);
    };
  }

  // when a noMusic ends
  subscribeEnded(cb: () => void) {
    this.endedHandlers.add(cb);

    return () => {
      this.endedHandlers.delete(cb);
    };
  }
}

type Track = {
  id: string | number;
  url: string;
  title: string;
};

export const noMusicEngine = new NoMusicEngine();
