export type TMessageQueueItem = {
  id: string;
  source?: string;
  mode?: "append" | "replace";
  createdAt?: number;
};
