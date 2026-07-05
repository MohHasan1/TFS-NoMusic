"use client";

import { useCallback, useEffect, useState } from "react";

type TOnlineStatus = "checking" | "online" | "offline";

async function checkServerOnline() {
  if (!navigator.onLine) return false;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 3000);

  try {
    const response = await fetch(`/api/health?t=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function useReliableOnlineStatus() {
  const [status, setStatus] = useState<TOnlineStatus>("checking");

  const checkOnline = useCallback(async () => {
    setStatus("checking");
    
    const isOnline = await checkServerOnline();
    setStatus(isOnline ? "online" : "offline");

    return isOnline;
  }, []);

  useEffect(() => {
    void checkOnline();

    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", () => {
      setStatus("offline");
    });

    return () => {
      window.removeEventListener("online", checkOnline);
    };
  }, [checkOnline]);

  return {
    status,
    isOnline: status === "online",
    isOffline: status === "offline",
    isChecking: status === "checking",
    checkOnline,
  };
}
