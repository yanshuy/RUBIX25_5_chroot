import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const challenges = [
    {
        id: 1,
        title: "AI for Climate Action",
        description:
            "Develop an AI solution that addresses climate change challenges.",
        category: "Environmental",
        difficulty: "Hard",
        participants: 45,
    },
    {
        id: 2,
        title: "Inclusive Education Platform",
        description:
            "Create an AI-powered platform to make education more accessible and inclusive.",
        category: "Education",
        difficulty: "Medium",
        participants: 32,
    },
    {
        id: 3,
        title: "Mental Health Companion",
        description:
            "Build an AI chatbot that provides mental health support and resources.",
        category: "Healthcare",
        difficulty: "Medium",
        participants: 38,
    },
];

export default function Challenges() {
    return (
        <ScrollArea className="flex-1 bg-[#313338] p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">
                Hackathon Challenges
            </h2>
            <div className="space-y-4">
                {challenges.map((challenge) => (
                    <Card key={challenge.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle>{challenge.title}</CardTitle>
                                <Badge variant="outline">
                                    {challenge.category}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{challenge.description}</p>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Difficulty: {challenge.difficulty}</span>
                                <span>
                                    {challenge.participants} participants
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
