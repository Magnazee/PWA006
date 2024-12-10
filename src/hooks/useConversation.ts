import { useState, useCallback } from 'react';
import { ClaudeService } from '../services/claudeService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const claudeService = new ClaudeService();

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsProcessing(true);
      addMessage('user', content);

      const conversationState = {
        messages: messages.map(({ role, content }) => ({ role, content })),
        currentLanguage
      };

      const response = await claudeService.sendMessage(content, currentLanguage, conversationState);
      addMessage('assistant', response);

      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [messages, currentLanguage, addMessage]);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  const updateLanguage = useCallback((lang: string | null) => {
    setCurrentLanguage(lang);
  }, []);

  return {
    messages,
    isProcessing,
    currentLanguage,
    sendMessage,
    addMessage,
    clearConversation,
    updateLanguage
  };
}