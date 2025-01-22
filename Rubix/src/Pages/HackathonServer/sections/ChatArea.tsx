import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, PlusCircle, Send } from "lucide-react";
import type { Channel } from "../HackathonServer";

interface Message {
    id: number;
    user: {
        name: string;
        avatar: string;
        initials: string;
    };
    content: string;
    timestamp: string;
    reactions?: {
        emoji: string;
        count: number;
    }[];
}

const messages: Message[] = [
    {
        id: 1,
        user: {
            name: "Sarah Chen",
            avatar: "/placeholder.svg",
            initials: "SC",
        },
        content:
            "🎉 Welcome to HackVirtual 2024! We're excited to have you all here. This year's theme is 'AI for Social Good'. Check out the Challenges channel for more details!",
        timestamp: "2:30 PM",
        reactions: [
            { emoji: "👍", count: 15 },
            { emoji: "🎉", count: 12 },
        ],
    },
    {
        id: 2,
        user: {
            name: "Alex Kumar",
            avatar: "/placeholder.svg",
            initials: "AK",
        },
        content:
            "Looking for 2 more team members! We're working on an AI-powered accessibility tool. Need someone with ML experience and a UI/UX designer.",
        timestamp: "2:35 PM",
        reactions: [{ emoji: "🤝", count: 3 }],
    },
];

interface ChatAreaProps {
    channel: Channel;
}

export default function ChatArea({ channel }: ChatAreaProps) {
    return (
        <div className="flex flex-1 flex-col bg-slate-100">
            <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="group flex items-start gap-4"
                        >
                            <Avatar>
                                <AvatarImage src={message.user.avatar} />
                                <AvatarFallback>
                                    {message.user.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-primary">
                                        {message.user.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {message.timestamp}
                                    </span>
                                </div>
                                <p className="mt-1 text-primary/90">
                                    {message.content}
                                </p>
                                {message.reactions && (
                                    <div className="mt-2 flex gap-2">
                                        {message.reactions.map(
                                            (reaction, index) => (
                                                <button
                                                    key={index}
                                                    className="flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 text-sm text-primary/90 hover:bg-primary/10"
                                                >
                                                    <span>
                                                        {reaction.emoji}
                                                    </span>
                                                    <span>
                                                        {reaction.count}
                                                    </span>
                                                </button>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-t bg-white p-4">
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                    >
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder={`Message #${channel.name}`}
                        className="border-0 bg-slate-200"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                    >
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Button size="icon">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
