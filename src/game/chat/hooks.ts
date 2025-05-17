import { useEffect } from 'react';
import * as sockets from '../../sockets';
import type { Message } from './types';

export function useChat() {
  useEffect(() => {
    sockets.chat.connect();

    return () => {
      sockets.chat.removeAllListeners();
      sockets.chat.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    const payload = message.trim();

    if (!payload) {
      return;
    }

    sockets.chat.emit('message', payload);
  };

  const subscribe = (event: string, callback: (payload: Message) => void) => {
    sockets.chat.on(event, callback);

    return () => {
      sockets.chat.off(event, callback);
    };
  };

  return {
    sendMessage,
    subscribe,
  };
}
