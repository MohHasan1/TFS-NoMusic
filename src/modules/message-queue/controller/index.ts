import { store } from "#store";
import { messageQueueEngine } from "../engine";
import { TMessageQueueItem } from "../type";

export class MessageQueueController {
  getMessages() {
    return store.getState().messageQueue;
  }

  getMessageById(messageId: TMessageQueueItem["id"]) {
    const messageQueue = store.getState().messageQueue;
    return messageQueueEngine.getById(messageQueue, messageId);
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
