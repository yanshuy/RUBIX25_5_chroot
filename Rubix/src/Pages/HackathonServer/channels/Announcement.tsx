import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

const announcements = [
    {
        id: 1,
        title: "Welcome to HackVirtual 2024!",
        content:
            "We're excited to kick off our annual hackathon. This year's theme is 'AI for Social Good'. Get ready for an amazing event!",
        date: "2024-02-15",
    },
    {
        id: 2,
        title: "Mentor Sessions Available",
        content:
            "Book your slots for one-on-one mentoring sessions. Spaces are limited, so hurry!",
        date: "2024-02-16",
    },
    {
        id: 3,
        title: "Submission Deadline Reminder",
        content:
            "Don't forget, all projects must be submitted by Sunday, 5 PM EST. No late submissions will be accepted.",
        date: "2024-02-17",
    },
];

export default function Announcements() {
    return (
        <ScrollArea className="flex-1 bg-[#313338] p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">
                Announcements
            </h2>
            <div className="space-y-4">
                {announcements.map((announcement) => (
                    <Card key={announcement.id}>
                        <CardHeader>
                            <CardTitle>{announcement.title}</CardTitle>
                            <CardDescription>
                                {announcement.date}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{announcement.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
