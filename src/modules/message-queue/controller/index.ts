import { store } from "#store";
import { messageQueueEngine } from "../engine";
import { TCreateMessageInput, TMessageQueueItem } from "../type";

export class MessageQueueController {
  getMessages() {
    return store.getState().messageQueue;
  }

  getMessagesByType(type: TMessageQueueItem["type"]) {
    const state = store.getState();

    return messageQueueEngine.getMessagesByType(state.messageQueue, type);
  }

  addMessage(messageInput: TCreateMessageInput) {
    const state = store.getState();

    const nextMessageQueue = messageQueueEngine.addMessage(state.messageQueue, messageInput);

    state.setMessageQueue(nextMessageQueue);
  }

  removeMessage(messageId: string) {
    const state = store.getState();

    const nextMessageQueue = messageQueueEngine.removeMessage(state.messageQueue, messageId);

    state.setMessageQueue(nextMessageQueue);
  }

  clearMessages() {
    const state = store.getState();

    state.setMessageQueue(messageQueueEngine.clearMessages());
  }
}

export const messageQueueController = new MessageQueueController();
