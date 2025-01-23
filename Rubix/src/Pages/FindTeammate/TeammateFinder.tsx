"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Server, Palette, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Teammate {
    id: number;
    name: string;
    role: string;
    skills: string[];
    avatar: string;
    matchPercentage: number;
    resume: string;
}

const teammates: Teammate[] = [
    {
        id: 1,
        name: "Alice Johnson",
        role: "Frontend Developer",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        avatar: "/placeholder.svg?height=100&width=100",
        matchPercentage: 95,
        resume: "Alice is a passionate frontend developer with 5 years of experience...",
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "Backend Developer",
        skills: ["Node.js", "Express", "MongoDB"],
        avatar: "/placeholder.svg?height=100&width=100",
        matchPercentage: 88,
        resume: "Bob is an experienced backend developer specializing in Node.js...",
    },
    {
        id: 3,
        name: "Charlie Brown",
        role: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "Sketch"],
        avatar: "/placeholder.svg?height=100&width=100",
        matchPercentage: 82,
        resume: "Charlie is a creative UI/UX designer with a keen eye for detail...",
    },
    {
        id: 4,
        name: "Diana Martinez",
        role: "Full Stack Developer",
        skills: ["React", "Node.js", "PostgreSQL"],
        avatar: "/placeholder.svg?height=100&width=100",
        matchPercentage: 91,
        resume: "Diana is a versatile full stack developer with expertise in both frontend and backend...",
    },
];

const roleIcons = {
    "Frontend Developer": <Code className="h-6 w-6 text-blue-500" />,
    "Backend Developer": <Server className="h-6 w-6 text-green-500" />,
    "UI/UX Designer": <Palette className="h-6 w-6 text-purple-500" />,
    "Full Stack Developer": <Zap className="h-6 w-6 text-yellow-500" />,
};

export default function TeammateFinder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(
        null,
    );

    const filteredTeammates = teammates.filter(
        (teammate) =>
            teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teammate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teammate.skills.some((skill) =>
                skill.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
    );

    return (
        <div className="space-y-6">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search by name, role, or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredTeammates.map((teammate) => (
                        <motion.div
                            key={teammate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">
                                            {teammate.name}
                                        </CardTitle>
                                        <Badge variant="secondary">
                                            {teammate.matchPercentage}% Match
                                        </Badge>
                                    </div>
                                    <CardDescription className="flex items-center">
                                        {roleIcons[teammate.role]}
                                        <span className="ml-2">
                                            {teammate.role}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {teammate.skills.map((skill, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setSelectedTeammate(
                                                        teammate,
                                                    )
                                                }
                                            >
                                                View Resume
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {selectedTeammate?.name}
                                                    &apos;s Resume
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {selectedTeammate?.role}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <p>
                                                    {selectedTeammate?.resume}
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button>Connect</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
