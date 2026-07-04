"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

export function usePlayerActions() {
  const playTrack = useCallback((track: TNoMusic) => {
    void playerController.playTrack(track);
  }, []);

  const playTrackById = useCallback((trackId: TNoMusic["id"]) => {
    void playerController.playTrackById(trackId);
  }, []);

  const pauseTrack = useCallback(() => {
    playerController.pauseTrack();
  }, []);

  const resumeTrack = useCallback(() => {
    void playerController.resumeTrack();
  }, []);

  const togglePlayback = useCallback(() => {
    void playerController.togglePlayback();
  }, []);

  const seekTo = useCallback((time: number) => {
    playerController.seekTrackTo(time);
  }, []);

  const setVolume = useCallback((volume: number) => {
    playerController.setVolume(volume);
  }, []);

  const clearPlayer = useCallback(() => {
    playerController.clearPlayer();
  }, []);

  return {
    playTrack,
    playTrackById,
    pauseTrack,
    resumeTrack,
    togglePlayback,
    seekTo,
    setVolume,
    clearPlayer,
  };
}
