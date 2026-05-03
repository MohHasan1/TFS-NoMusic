"use server";

import { createRequest } from "@/services/requests/requests.ports";

export async function submitRequestAccessAction(
  _prevState: RequestAccessState,
  formData: FormData,
): Promise<RequestAccessState> {
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
      success:
        "Access request submitted. We will review it and get back to you.",
    };
  } catch {
    return { error: "Unable to submit request right now. Please try again." };
  }
}

export type RequestAccessState = {
  error?: string;
  success?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
