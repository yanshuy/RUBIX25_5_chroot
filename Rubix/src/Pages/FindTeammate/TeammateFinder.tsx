import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Trophy, Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { baseUrl } from "../../App";

interface Teammate {
    email: string;
    full_name: string;
    github: string;
    github_score: number;
    linkedin: string;
    resume: string | null;
    role: string;
    skills: string[];
}

function getUsers() {
    return fetch(`${baseUrl}/api/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "ngrok-skip-browser-warning": "69420",
        },
    }).then((res) => res.json());
}

function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
}

export default function TeammateFinder() {
    const { data, isLoading } = useUsers();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTeammates = data?.filter(
        (teammate: Teammate) =>
            teammate.full_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            teammate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teammate.skills.some((skill: string) =>
                skill.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
    );

    if (isLoading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search by name, role, or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 w-full rounded-full border border-slate-400 pl-14"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredTeammates?.map((teammate: Teammate) => (
                        <motion.div
                            key={teammate.email}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <Card className="h-full w-full max-w-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        {teammate.full_name}
                                    </CardTitle>
                                    <Badge
                                        variant="secondary"
                                        className="w-fit"
                                    >
                                        student
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                {teammate.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                GitHub Score:{" "}
                                                {teammate.github_score}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {teammate.skills.map((skill, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                            >
                                                {skill.replace(/[[\]']/g, "")}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        {teammate.github && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={teammate.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Github className="mr-2 h-4 w-4" />
                                                    GitHub
                                                </a>
                                            </Button>
                                        )}
                                        {teammate.linkedin && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={teammate.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Linkedin className="mr-2 h-4 w-4" />
                                                    LinkedIn
                                                </a>
                                            </Button>
                                        )}
                                        {teammate.resume && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={teammate.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    Resume
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
