import { TCreateMessageInput, TMessageQueueItem } from "../type";

export class MessageQueueEngine {
  private createMessage(message: TCreateMessageInput): TMessageQueueItem {
    return {
      ...message,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
  }

  addMessage(messageQueue: TMessageQueueItem[], messageInput: TCreateMessageInput) {
    const message = this.createMessage(messageInput);

    if (message.payload.mode === "replace") {
      return [
        ...messageQueue.filter(
          (currentMessage) => currentMessage.payload.sourceKey !== message.payload.sourceKey,
        ),
        message,
      ];
    }

    return [...messageQueue, message];
  }

  getMessagesByType(messageQueue: TMessageQueueItem[], type: TMessageQueueItem["type"]) {
    return messageQueue.filter((message) => message.type === type);
  }

  removeMessage(messageQueue: TMessageQueueItem[], messageId: string): TMessageQueueItem[] {
    return messageQueue.filter((message) => message.id !== messageId);
  }

  clearMessages(): TMessageQueueItem[] {
    return [];
  }
}

export const messageQueueEngine = new MessageQueueEngine();
