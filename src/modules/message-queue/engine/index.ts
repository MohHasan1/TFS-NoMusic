import { TMessageQueueItem } from "../type";

export class MessageQueueEngine {
  private createMessage(message: TMessageQueueItem) {
    return {
      ...message,
      createdAt: Date.now(),
    };
  }

  addOne(messageQueue: TMessageQueueItem[], messageItem: TMessageQueueItem) {
    const message = this.createMessage(messageItem);

    if (message.mode === "replace") {
      return [
        ...messageQueue.filter((currentMessage) => currentMessage.id !== message.id),
        message,
      ];
    }

    return [...messageQueue, message];
  }

  getById(messageQueue: TMessageQueueItem[], messageId: TMessageQueueItem["id"]) {
    return messageQueue.find((message) => message.id === messageId);
  }

  removeById(messageQueue: TMessageQueueItem[], messageId: TMessageQueueItem["id"]) {
    return messageQueue.filter((message) => message.id !== messageId);
  }

  clearMessages(): TMessageQueueItem[] {
    return [];
  }
}

export const messageQueueEngine = new MessageQueueEngine();
