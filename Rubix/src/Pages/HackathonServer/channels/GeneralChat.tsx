import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, PlusCircle, Send } from "lucide-react";

const messages = [
    {
        id: 1,
        user: { name: "Sarah Chen", avatar: "/placeholder.svg" },
        content: "Hey everyone! How's the hackathon going for you all?",
        timestamp: "2:30 PM",
    },
    {
        id: 2,
        user: { name: "Alex Kumar", avatar: "/placeholder.svg" },
        content:
            "It's been great! Our team just had a breakthrough with our ML model.",
        timestamp: "2:32 PM",
    },
    {
        id: 3,
        user: { name: "Lisa Park", avatar: "/placeholder.svg" },
        content:
            "That's awesome, Alex! We're still brainstorming ideas. Any tips?",
        timestamp: "2:35 PM",
    },
];

export default function GeneralChat() {
    return (
        <div className="flex flex-1 flex-col bg-[#313338]">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="flex items-start gap-4"
                        >
                            <Avatar>
                                <AvatarImage src={message.user.avatar} />
                                <AvatarFallback>
                                    {message.user.name[0]}
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
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-t border-[#1E1F22] p-4">
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                    >
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder="Message #general"
                        className="border-0 bg-[#383A40]"
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
