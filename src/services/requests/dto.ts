export type CreateRequestDTO = {
  type: "access_request" | "nomusic_request" | "general_feedback" | "bug_report";
  name?: string;
  url?: string;
  email?: string;
  message?: string;
  metadata?: Record<string, unknown>;
};
