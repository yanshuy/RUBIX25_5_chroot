import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const events = [
    {
        id: 1,
        title: "Opening Ceremony",
        description: "Welcome address and kickoff",
        time: "2024-02-15 09:00 AM",
        duration: "1 hour",
    },
    {
        id: 2,
        title: "Team Formation",
        description: "Find your teammates and start brainstorming",
        time: "2024-02-15 10:00 AM",
        duration: "2 hours",
    },
    {
        id: 3,
        title: "Hacking Begins",
        description: "Start working on your projects",
        time: "2024-02-15 12:00 PM",
        duration: "48 hours",
    },
    {
        id: 4,
        title: "Midway Check-in",
        description: "Progress updates and mentorship sessions",
        time: "2024-02-16 12:00 PM",
        duration: "2 hours",
    },
    {
        id: 5,
        title: "Project Submissions",
        description: "Submit your projects for judging",
        time: "2024-02-17 12:00 PM",
        duration: "2 hours",
    },
    {
        id: 6,
        title: "Closing Ceremony",
        description: "Project presentations and winners announcement",
        time: "2024-02-17 03:00 PM",
        duration: "2 hours",
    },
];

export default function Schedule() {
    return (
        <ScrollArea className="flex-1 bg-[#313338] p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">
                Event Schedule
            </h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <Card key={event.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle>{event.title}</CardTitle>
                                <Badge variant="outline">
                                    {event.duration}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">{event.description}</p>
                            <p className="text-sm text-muted-foreground">
                                {event.time}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
