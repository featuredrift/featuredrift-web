import { useCallback, useEffect, useState } from 'react';
import * as sockets from '../sockets';
import type { ChatMessage } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<Record<string, ChatMessage>>({});

  useEffect(() => {
    sockets.chat.connect();

    return () => {
      sockets.chat.removeAllListeners();
      sockets.chat.disconnect();
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    const payload = message.trim();

    if (!payload) {
      return;
    }

    sockets.chat.emit('message', payload);
  }, []);

  const subscribe = useCallback(
    (event: string, callback: (payload: ChatMessage) => void) => {
      sockets.chat.on(event, callback);

      return () => {
        sockets.chat.off(event, callback);
      };
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = subscribe('message', (msg: ChatMessage) => {
      setMessages((prev) => ({
        ...prev,
        [msg.id]: msg,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return { messages, sendMessage };
}
