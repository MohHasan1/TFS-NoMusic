"use server";

import { getCurrentUser } from "@/services/auth/auth.ports";
import { createRequest } from "@/services/requests/requests.ports";

export async function submitRequestAccessAction(_prevState: RequestAccessState, formData: FormData): Promise<RequestAccessState> {
  const email = getString(formData, "email").toLowerCase();
  const message = getString(formData, "message");

  if (!email) {
    return { error: "Email is required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await createRequest({
      type: "access_request",
      email,
      message,
      metadata: {
        source: "request-access-page",
      },
    });

    return {
      success: "Access request submitted. We will review it and get back to you.",
    };
  } catch {
    return { error: "Unable to submit request right now. Please try again." };
  }
}

export type RequestAccessState = {
  error?: string;
  success?: string;
};

export async function submitNoMusicRequestAction(_prevState: RequestNoMusicState, formData: FormData): Promise<RequestNoMusicState> {
  const youtubeURL = getString(formData, "youtubeURL");
  const description = getString(formData, "description");

  if (!youtubeURL) {
    return { error: "YouTube URL is required." };
  }

  if (!isYouTubeURL(youtubeURL)) {
    return { error: "Please enter a valid YouTube URL." };
  }

  const user = await getCurrentUser();

  try {
    await createRequest({
      type: "nomusic_request",
      youtubeURL,
      message: description,
      metadata: {
        source: "private-request-songs-page",
        requestedByEmail: user?.email,
        requestedByName: user?.fullName,
      },
    });

    return { success: "Request submitted. We will review and add it if available." };
  } catch {
    return { error: "Unable to submit song request right now. Please try again." };
  }
}

export type RequestNoMusicState = {
  error?: string;
  success?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isYouTubeURL(value: string) {
  const normalized = value.toLowerCase();
  return normalized.includes("youtube.com/watch") || normalized.includes("youtu.be/");
}
