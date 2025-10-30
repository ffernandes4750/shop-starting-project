import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Cria uma única instância de socket para a app inteira.
export function getSocket(): Socket {
  if (!socket) {
    const baseUrl = "http://localhost:3000";
    socket = io(`${baseUrl}/sockets`, {
      withCredentials: true,
      // Opcional: força WebSocket e evita long-polling
      transports: ["websocket"],
      // auth: { token: getTokenSomehow() },
    });
  }
  return socket;
}
