export type TMessageQueueItem = {
  id: string;
  type: string;
  mode?: "append" | "replace";
  createdAt?: number;
};
