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
import { MessageSquare } from "lucide-react";

const questions = [
    {
        id: 1,
        title: "How to integrate OpenAI API with React?",
        author: "Alex Kumar",
        category: "API",
        responses: 3,
        solved: true,
    },
    {
        id: 2,
        title: "Best practices for deploying ML models?",
        author: "Priya Sharma",
        category: "Machine Learning",
        responses: 2,
        solved: false,
    },
    {
        id: 3,
        title: "Optimizing database queries for large datasets",
        author: "Tom Chen",
        category: "Database",
        responses: 5,
        solved: true,
    },
];

export default function TechnicalHelp() {
    return (
        <ScrollArea className="flex-1 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                    Technical Help
                </h2>
                <Button>Ask a Question</Button>
            </div>
            <div className="space-y-4">
                {questions.map((question) => (
                    <Card key={question.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle>{question.title}</CardTitle>
                                <Badge
                                    variant={
                                        question.solved ? "default" : "outline"
                                    }
                                >
                                    {question.solved ? "Solved" : "Open"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Asked by: {question.author}</span>
                                <span>Category: {question.category}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Responses ({question.responses})
                            </Button>
                            <Button size="sm">View Thread</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
