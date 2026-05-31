"use client";

import { useCallback } from "react";

import { messageQueueController } from "../controller";
import { TMessageQueueItem } from "../type";

export function useMessageQueue() {
  const addMessage = useCallback((messageItem: TMessageQueueItem) => {
    messageQueueController.addMessage(messageItem);
  }, []);

  const consumeMessageById = useCallback((messageId: TMessageQueueItem["id"]) => {
    return messageQueueController.consumeMessageById(messageId);
  }, []);

  const getMessageById = useCallback((messageId: TMessageQueueItem["id"]) => {
    return messageQueueController.getMessageById(messageId);
  }, []);

  const removeMessage = useCallback((messageId: TMessageQueueItem["id"]) => {
    messageQueueController.removeMessage(messageId);
  }, []);

  const clearMessages = useCallback(() => {
    messageQueueController.clearMessages();
  }, []);

  return {
    getMessageById,
    consumeMessageById,
    addMessage,
    removeMessage,
    clearMessages,
  };
}
