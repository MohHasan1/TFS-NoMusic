export type CreateRequestDTO = {
  type: "access_request" | "music_request" | "general_feedback" | "bug_report";
  email: string;
  message?: string;
  metadata?: Record<string, unknown>;
};
