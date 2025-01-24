import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useMemo, ReactNode } from "react";

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
    const socket = useMemo(() => {
        const newSocket = io("https://raahi-socket.onrender.com/")
        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });
        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });
        return newSocket;
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
