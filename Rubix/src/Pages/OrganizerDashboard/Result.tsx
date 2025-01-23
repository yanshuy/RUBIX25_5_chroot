import type React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Medal } from "lucide-react";

// Dummy data
const results = [
    {
        position: 1,
        teamName: "Team Alpha",
        domain: "E-commerce",
        repoLink: "https://github.com/team-alpha",
        liveLink: "https://team-alpha.com",
        rating: 98,
    },
    {
        position: 2,
        teamName: "Team Beta",
        domain: "FinTech",
        repoLink: "https://github.com/team-beta",
        liveLink: "https://team-beta.com",
        rating: 95,
    },
    {
        position: 3,
        teamName: "Team Gamma",
        domain: "HealthTech",
        repoLink: "https://github.com/team-gamma",
        liveLink: "https://team-gamma.com",
        rating: 92,
    },
    {
        position: 4,
        teamName: "Team Delta",
        domain: "EdTech",
        repoLink: "https://github.com/team-delta",
        liveLink: "https://team-delta.com",
        rating: 8,
    },
    {
        position: 5,
        teamName: "Team Epsilon",
        domain: "AI/ML",
        repoLink: "https://github.com/team-epsilon",
        liveLink: "https://team-epsilon.com",
        rating: 8.5,
    },
].sort((a, b) => b.rating - a.rating);

const Result: React.FC = () => {
    return (
        <Card className="mx-auto w-full px-10 ">
            <CardHeader>
                <CardTitle className="text-center text-4xl mb-2 font-bold text-primary">
                    Results
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">
                                Position
                            </TableHead>
                            <TableHead>Team Name</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead >Repo Link</TableHead>
                            <TableHead>Live Link</TableHead>
                            <TableHead >Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow
                                key={result.position}
                                className={index < 3 ? "font-medium" : ""}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {result.position}
                                        {index < 3 && (
                                            <Medal
                                                className={`h-5 w-5 ${
                                                    index === 0
                                                        ? "text-yellow-500"
                                                        : index === 1
                                                          ? "text-gray-400"
                                                          : "text-orange-500"
                                                }`}
                                            />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{result.teamName}</TableCell>
                                <TableCell>{result.domain}</TableCell>
                                <TableCell>
                                    <Button variant="link" asChild>
                                        <a
                                        className=" text-left px-0 "
                                            href={result.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Repository
                                        </a>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="link" asChild>
                                        <a
                                        className=" text-left px-0 "
                                            href={result.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Live Demo
                                        </a>
                                    </Button>
                                </TableCell>
                                <TableCell className=" pl-5">
                                    {result.rating}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Result;
