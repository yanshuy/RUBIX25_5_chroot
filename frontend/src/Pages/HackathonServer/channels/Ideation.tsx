import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const ideas = [
    {
        id: 1,
        title: "AI-Powered Language Learning Assistant",
        description:
            "An AI tutor that adapts to individual learning styles and provides personalized language lessons.",
        author: "Maria Garcia",
        likes: 15,
    },
    {
        id: 2,
        title: "Sustainable City Planner",
        description:
            "An AI tool that helps urban planners design more sustainable and efficient cities.",
        author: "Tom Chen",
        likes: 12,
    },
    {
        id: 3,
        title: "Mental Health Prediction App",
        description:
            "An application that uses AI to predict potential mental health issues based on user behavior and provides early intervention resources.",
        author: "Lisa Park",
        likes: 18,
    },
];

export default function Ideation() {
    return (
        <ScrollArea className="flex-1 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                    Ideation Board
                </h2>
                <Button>Share New Idea</Button>
            </div>
            <div className="space-y-4">
                {ideas.map((idea) => (
                    <Card key={idea.id}>
                        <CardHeader>
                            <CardTitle>{idea.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">{idea.description}</p>
                            <p className="text-sm text-muted-foreground">
                                Proposed by: {idea.author}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Like ({idea.likes})
                            </Button>
                            <Button size="sm">Discuss</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
