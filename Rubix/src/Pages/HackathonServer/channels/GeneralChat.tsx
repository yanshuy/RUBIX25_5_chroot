import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, PlusCircle, Send } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Content } from "@radix-ui/react-tabs";

interface Message {
    id: number;
    user: string;
    message: string;
    timestamp: string;
}

export default function GeneralChat({ id }: { id: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(
            `ws://live-merely-drum.ngrok-free.app/ws/hackathons/${id}/general/?token=${localStorage.getItem("accessToken")}`,
        );

        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.history) {
                setMessages(message.history);
                return;
            }
            console.log(message);
            setMessages((prev) => [...prev, message]);
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            message: newMessage,
            timestamp: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            }),
        };

        socket.send(JSON.stringify(messageData));
        setNewMessage("");
    };

    return (
        <div className="flex flex-1 flex-col bg-slate-50">
            <ScrollArea className="min-h-[calc(100vh-8rem)] flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message, index) => {
                        console.log(message);
                        return (
                            <div key={index} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback className="bg-slate-100">
                                        {message?.message.substring(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-primary">
                                            {message.user}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {message.timestamp}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-primary/90">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
            <div className="border-t p-4">
                <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-2"
                >
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                    >
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message #general"
                        className="border-0 bg-slate-200"
                    />
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                    >
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Button type="submit" size="icon">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
