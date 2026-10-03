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
import { Star } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "EcoSmart City Planner",
        team: "Green Innovators",
        category: "Sustainability",
        averageScore: 8.5,
        status: "Evaluated",
    },
    {
        id: 2,
        title: "AI Mental Health Companion",
        team: "Mind Matters",
        category: "Healthcare",
        averageScore: 9.2,
        status: "Pending",
    },
    {
        id: 3,
        title: "Language Learning AI",
        team: "Polyglot Pros",
        category: "Education",
        averageScore: 7.8,
        status: "Evaluated",
    },
];

export default function Judging() {
    return (
        <ScrollArea className="flex-1 bg-slate-50 p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">
                Judging Panel
            </h2>
            <div className="space-y-4">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle>{project.title}</CardTitle>
                                <Badge
                                    variant={
                                        project.status === "Evaluated"
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    {project.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">Team: {project.team}</p>
                            <p className="mb-2">Category: {project.category}</p>
                            <div className="flex items-center">
                                <Star className="mr-1 text-yellow-400" />
                                <span>
                                    Average Score: {project.averageScore}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant={
                                    project.status === "Evaluated"
                                        ? "outline"
                                        : "default"
                                }
                            >
                                {project.status === "Evaluated"
                                    ? "View Evaluation"
                                    : "Evaluate Project"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
