import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const members = [
    {
        category: "Organizers",
        users: [
            { name: "Sarah Chen", status: "online", role: "Lead Organizer" },
            { name: "Mike Ross", status: "online", role: "Technical Lead" },
        ],
    },
    {
        category: "Mentors",
        users: [
            { name: "Dr. Emily Wong", status: "online", role: "AI/ML Expert" },
            { name: "James Wilson", status: "offline", role: "Frontend Dev" },
            { name: "Priya Sharma", status: "online", role: "UX Designer" },
        ],
    },
    {
        category: "Teammates",
        users: [],
    },
];

export default function MembersList({ teamData }) {
    console.log(teamData);

    members[2].users =
        teamData?.teamDetails.members.map((member) => ({
            ...member,
            status: "online",
        })) ?? [];

    console.log(members, teamData);
    return (
        <div className="bg-slate-2s00 w-60">
            <ScrollArea className="h-full">
                <div className="space-y-6 p-4">
                    {members.map((category) => (
                        <div key={category.category}>
                            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                                {category.category} - {category.users.length}
                            </h3>
                            <div className="space-y-2">
                                {category.users.map((user) => (
                                    <div
                                        key={user.name}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="relative">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder.svg" />
                                                <AvatarFallback>
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span
                                                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#2B2D31] ${
                                                    user.status === "online"
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                }`}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm text-primary">
                                                {user.name}
                                            </div>
                                            <div className="truncate text-xs text-muted-foreground">
                                                {user.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
