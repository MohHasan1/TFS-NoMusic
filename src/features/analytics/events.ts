export type TAnalyticsEvents = {
  app_opened: {
    entry_path: string;
  };

  song_played: {
    song_id: string;
    song_name: string;
    library_id?: string;
    library_name?: string;
    audio_language?: string;
  };

  song_completed: {
    song_id: string;
    song_name: string;
    library_id?: string;
    listened_seconds?: number;
    duration_seconds?: number;
  };

  library_opened: {
    library_id: string;
    library_name: string;
  };

  playback_failed: {
    song_id: string;
    song_name: string;
    library_id?: string;
    error_name?: string;
  };
};

export type TAnalyticsEventName = keyof TAnalyticsEvents;
