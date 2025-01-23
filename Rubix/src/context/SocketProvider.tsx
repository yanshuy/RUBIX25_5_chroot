import React, { createContext, useMemo, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  
  if (!socket) {
    throw new Error("Socket must be used within a SocketProvider");
  }
  return socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
