import type { TNoMusic } from "#types/nomusic";

type TBaseMessage = {
  id: string;
  createdAt: number;
};

type TMessageMode = "append" | "replace";

export type TCreateMessageInput = Omit<TMessageQueueItem, "id" | "createdAt">;
export type TMessageQueueItem = TBaseMessage & {
  type: "NOMUSIC_LOADED";
  payload: {
    sourceKey: string;
    tracks: TNoMusic[];
    mode: TMessageMode;
  };
};
