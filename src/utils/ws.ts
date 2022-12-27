import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/messages', { auth: { token: 1 }, transports: ['websocket'] });

export default socket;
