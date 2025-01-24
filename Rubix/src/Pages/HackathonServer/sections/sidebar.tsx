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
import { IoBackspace, IoExit } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

interface SidebarProps {
    activeChannel: Channel;
    setActiveChannel: (channel: Channel) => void;
}

export default function Sidebar({
    data,
    teamData,
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

    const teamChannels = [
        {
            category: "Team",
            items: [
                {
                    id: "team",
                    name: "Team Chat",
                    icon: Users,
                    description: "Chat with your team members",
                },
                {
                    id: "team-voice",
                    name: "Voice Chat",
                    icon: Video,
                    description: "Voice chat with your team members",
                },
            ],
        },
    ];

    const params = useParams();
    const navigate = useNavigate();

    console.log(teamData);

    return (
        <div className="flex w-64 flex-col border-r bg-white">
            <div className="flex items-center gap-2 border-b p-4">
                <IoExit
                    className="h-6 w-6 rotate-180 text-primary"
                    onClick={() =>
                        navigate(`/dashboard/hackathons/${params.id}`)
                    }
                />
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
                                    title={item.description}
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
                                    title={item.description}
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
                    {teamData ? (
                        <div>
                            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-800">
                                TEAM {teamData.teamDetails.teamName}
                            </h2>
                            {teamChannels.map((category) => (
                                <div key={category.category}>
                                    {category.items.map((item) => (
                                        <button
                                            title={item.description}
                                            key={item.id}
                                            onClick={() =>{
                                                // if(item.id === "team-voice"){navigate(`/dashboard/hackathons/room/${params.id}/${teamData.teamId}`)}
                                                setActiveChannel({
                                                    id: item.id,
                                                    name: item.name,
                                                    category: category.category,
                                                    description:
                                                        item.description,
                                                })}
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
                    ) : (
                        <div className="animate-pulse px-2 text-slate-300">
                            Setting up Team chat
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
