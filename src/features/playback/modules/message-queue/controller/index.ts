import { store } from "#store";
import { messageQueueEngine } from "../engine";
import { TMessageQueueItem } from "../type";

export class MessageQueueController {
  getMessageById(messageId: TMessageQueueItem["id"]) {
    const messageQueue = store.getState().messageQueue;
    return messageQueueEngine.getById(messageQueue, messageId);
  }

  consumeMessageById(messageId: TMessageQueueItem["id"]) {
    const { messageQueue, setMessageQueue } = store.getState();

    const result = messageQueueEngine.consumeById(messageQueue, messageId);
    setMessageQueue(result.nextMessageQueue);

    return result.message;
  }

  addMessage(messageItem: TMessageQueueItem) {
    const { messageQueue, setMessageQueue } = store.getState();

    const nextMessageQueue = messageQueueEngine.addOne(messageQueue, messageItem);
    setMessageQueue(nextMessageQueue);
  }

  removeMessage(messageId: string) {
    const { messageQueue, setMessageQueue } = store.getState();

    const nextMessageQueue = messageQueueEngine.removeById(messageQueue, messageId);
    setMessageQueue(nextMessageQueue);
  }

  clearMessages() {
    const { setMessageQueue } = store.getState();
    setMessageQueue(messageQueueEngine.clearMessages());
  }
}

export const messageQueueController = new MessageQueueController();
