import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const docs = [
    {
        id: 1,
        title: "Getting Started Guide",
        content:
            "Welcome to HackVirtual 2024! This guide will help you get set up and ready to start hacking...",
    },
    {
        id: 2,
        title: "API Documentation",
        content:
            "Explore the various APIs available for your projects. We provide access to cutting-edge AI models...",
    },
    {
        id: 3,
        title: "Submission Guidelines",
        content:
            "Learn how to properly submit your project for judging. Make sure to follow these guidelines...",
    },
];

export default function Documentation() {
    return (
        <ScrollArea className="flex-1 bg-slate-50 p-6">
            <h2 className="mb-6 text-2xl font-bold text-primary">
                Documentation
            </h2>
            <div className="relative mb-6">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input placeholder="Search documentation..." className="pl-8" />
            </div>
            <div className="space-y-4">
                {docs.map((doc) => (
                    <Card key={doc.id}>
                        <CardHeader>
                            <CardTitle>{doc.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{doc.content.substring(0, 100)}...</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
