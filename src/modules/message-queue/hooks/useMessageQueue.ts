"use client";

import { useCallback } from "react";

import { messageQueueController } from "../controller";
import { TMessageQueueItem } from "../type";

export function useMessageQueue() {
  const addMessage = useCallback((messageItem: TMessageQueueItem) => {
    messageQueueController.addMessage(messageItem);
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
    addMessage,
    removeMessage,
    clearMessages,
  };
}
