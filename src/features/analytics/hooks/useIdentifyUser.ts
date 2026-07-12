"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function useIdentifyUser({ userId, userEmail, userName }: TArgs) {
  useEffect(() => {
    posthog.identify(userId, { email: userEmail, name: userName });
  }, [userId, userEmail, userName]);
}

type TArgs = {
  userId: string;
  userEmail: string;
  userName: string;
};
