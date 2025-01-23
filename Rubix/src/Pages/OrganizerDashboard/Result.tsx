import React, { useEffect, useState } from "react";
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
import { baseUrl } from "../../App";
import { useParams } from "react-router-dom";


interface Project {
    id: number;
    teamName: string;
    domain: string;
    repoLink: string;
    liveLink: string;
    avgRating: string;
}

const Result: React.FC = () => {
    const [results, setResults] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const param =useParams();
    const id = param.id;

    const fetchData = async () => {
        
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await fetch(
                `${baseUrl}/api/core/hackathons/${id}/projects/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "ngrok-skip-browser-warning": "true",
                    },
                },
            );
            const data = await response.json();
            const sortedData = data.sort(
                (a: Project, b: Project) =>
                    parseFloat(b.avgRating) - parseFloat(a.avgRating),
            );
            setResults(sortedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="mx-auto w-full px-10">
            <CardHeader>
                <CardTitle className="mb-2 text-center text-4xl font-bold text-primary">
                    Results
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Position</TableHead>
                            <TableHead>Team Name</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead>Repo Link</TableHead>
                            <TableHead>Live Link</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow
                                key={result.id}
                                className={index < 3 ? "font-medium" : ""}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {index + 1}
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
                                            className="px-0 text-left"
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
                                            className="px-0 text-left"
                                            href={result.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Live Demo
                                        </a>
                                    </Button>
                                </TableCell>
                                <TableCell className="pl-5">
                                    {result.avgRating}
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
