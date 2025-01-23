import {
    Home,
    Users,
    Trophy,
    Book,
    Video,
    MessageSquare,
    Lightbulb,
    FileCode,
    Award,
    HelpCircle,
    Calendar,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Channel } from "../HackathonServer";

interface SidebarProps {
    activeChannel: Channel;
    setActiveChannel: (channel: Channel) => void;
}

export default function Sidebar({
    data,
    activeChannel,
    setActiveChannel,
}: SidebarProps) {
    const channels = [
        {
            category: "Getting Started",
            items: [
                {
                    id: "announcements",
                    name: "Announcements",
                    icon: Home,
                    description:
                        "Important updates and announcements for all participants",
                },

                {
                    id: "challenges",
                    name: "Challenges",
                    icon: Trophy,
                    description:
                        "View all hackathon challenges and requirements",
                },
                {
                    id: "schedule",
                    name: "Schedule",
                    icon: Calendar,
                    description: "View event schedule and timeline",
                },
            ],
        },
        {
            category: "Resources",
            items: [
                {
                    id: "documentation",
                    name: "Documentation",
                    icon: Book,
                    description: "Access guides and documentation",
                },

                {
                    id: "mentorship",
                    name: "Mentorship",
                    icon: HelpCircle,
                    description: "Get help from our mentors",
                },
            ],
        },
        {
            category: "Team Channels",
            items: [
                {
                    id: "general",
                    name: "General Chat",
                    icon: MessageSquare,
                    description: "General discussion for all participants",
                },
                {
                    id: "ideation",
                    name: "Ideation",
                    icon: Lightbulb,
                    description: "Share and discuss project ideas",
                },
                {
                    id: "technical",
                    name: "Technical Help",
                    icon: FileCode,
                    description: "Get technical support",
                },
            ],
        },
    ];
    const adminChannels = [
        {
            category: "Admin",
            items: [
                // {
                //     id: "submissions",
                //     name: "Submissions",
                //     icon: FileCode,
                //     description: "Submit your project",
                // },
                {
                    id: "judging",
                    name: "Judging",
                    icon: Award,
                    description: "Judging criteria and process",
                },
            ],
        },
    ];

    return (
        <div className="flex w-64 flex-col border-r bg-white">
            <div className="border-b p-4">
                <h1 className="text-xl font-bold text-primary">
                    {!data ? (
                        <div className="h-[28px] w-full rounded-full bg-slate-100"></div>
                    ) : (
                        data.hackathonName
                    )}
                </h1>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-4 p-2">
                    {channels.map((category) => (
                        <div key={category.category}>
                            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-800">
                                {category.category}
                            </h2>
                            {category.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setActiveChannel({
                                            id: item.id,
                                            name: item.name,
                                            category: category.category,
                                            description: item.description,
                                            unreadCount: item.unreadCount,
                                        })
                                    }
                                    className={`mb-1 flex w-full items-center justify-between rounded px-2 py-1.5 text-sm ${
                                        activeChannel.id === item.id
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-500 hover:bg-primary/5 hover:text-primary"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </div>
                                    {item.unreadCount && (
                                        <span className="rounded-full bg-red-500 px-1.5 text-xs text-white">
                                            {item.unreadCount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                    {adminChannels.map((category) => (
                        <div key={category.category}>
                            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-800">
                                {category.category}
                            </h2>
                            {category.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setActiveChannel({
                                            id: item.id,
                                            name: item.name,
                                            category: category.category,
                                            description: item.description,
                                        })
                                    }
                                    className={`mb-1 flex w-full items-center justify-between rounded px-2 py-1.5 text-sm ${
                                        activeChannel.id === item.id
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-500 hover:bg-primary/5 hover:text-primary"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
