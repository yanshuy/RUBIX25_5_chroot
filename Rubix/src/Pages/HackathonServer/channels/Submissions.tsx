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
import { Progress } from "@/components/ui/progress";

const submissions = [
    {
        id: 1,
        title: "EcoSmart City Planner",
        team: "Green Innovators",
        status: "In Progress",
        progress: 75,
    },
    {
        id: 2,
        title: "AI Mental Health Companion",
        team: "Mind Matters",
        status: "Submitted",
        progress: 100,
    },
    {
        id: 3,
        title: "Language Learning AI",
        team: "Polyglot Pros",
        status: "In Progress",
        progress: 90,
    },
];

export default function Submissions() {
    return (
        <ScrollArea className="flex-1 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                    Project Submissions
                </h2>
                <Button>New Submission</Button>
            </div>
            <div className="space-y-4">
                {submissions.map((submission) => (
                    <Card key={submission.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle>{submission.title}</CardTitle>
                                <Badge
                                    variant={
                                        submission.status === "Submitted"
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    {submission.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">Team: {submission.team}</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{submission.progress}%</span>
                                </div>
                                <Progress value={submission.progress} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">Edit Submission</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
