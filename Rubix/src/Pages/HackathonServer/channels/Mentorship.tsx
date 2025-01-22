import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mentors = [
    {
        id: 1,
        name: "Dr. Emily Wong",
        expertise: "AI/ML Expert",
        availability: "Available",
        avatar: "/placeholder.svg",
    },
    {
        id: 2,
        name: "James Wilson",
        expertise: "Frontend Development",
        availability: "Busy",
        avatar: "/placeholder.svg",
    },
    {
        id: 3,
        name: "Priya Sharma",
        expertise: "UX Design",
        availability: "Available",
        avatar: "/placeholder.svg",
    },
];

export default function Mentorship() {
    return (
        <ScrollArea className="flex-1 bg-[#313338] p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">Mentorship</h2>
            <div className="space-y-4">
                {mentors.map((mentor) => (
                    <Card key={mentor.id}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={mentor.avatar} />
                                    <AvatarFallback>
                                        {mentor.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{mentor.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {mentor.expertise}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">
                                Availability: {mentor.availability}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={mentor.availability === "Busy"}>
                                {mentor.availability === "Busy"
                                    ? "Unavailable"
                                    : "Request Mentorship"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
