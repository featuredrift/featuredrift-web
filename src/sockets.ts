import { io } from 'socket.io-client';

export const chat = io({
  path: '/api/v1/socket/chat',
  withCredentials: true,
  autoConnect: false,
});
