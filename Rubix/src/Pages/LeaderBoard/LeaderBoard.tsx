"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { useLeaderboardData } from "../../hooks/useLeaderBoardData";

export default function Leaderboard() {
    const { leaderboardData, searchTerm, setSearchTerm } = useLeaderboardData();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const getTrophyColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-400";
            case 2:
                return "text-gray-400";
            case 3:
                return "text-amber-600";
            default:
                return "text-transparent";
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-7xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold text-slate-800">
                        Hackathon Leaderboard
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Top teams ranked by Wins and Hack Coins
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search by team or project name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mx-auto w-full max-w-md"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="border">
                                <TableRow className="divide-x">
                                    <TableHead className="w-[50px]">
                                        Rank
                                    </TableHead>
                                    <TableHead>Team Name</TableHead>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead className="w-[100px]">
                                        Wins
                                    </TableHead>
                                    <TableHead className="w-[150px]">
                                        Hack Coins
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        Members
                                    </TableHead>
                                    <TableHead>Achievement</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaderboardData.map((entry, index) => (
                                    <TableRow
                                        key={entry.id}
                                        className={`${"bg-slate-50"} divide-x transition-colors duration-200 ease-in-out ${
                                            hoveredRow === entry.id
                                                ? "bg-blue-100"
                                                : ""
                                        } ${index < 3 ? "font-semibold" : ""}`}
                                        onMouseEnter={() =>
                                            setHoveredRow(entry.id)
                                        }
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <Trophy
                                                    className={`mr-2 ${getTrophyColor(index + 1)}`}
                                                />
                                                {index + 1}
                                            </div>
                                        </TableCell>
                                        <TableCell>{entry.teamName}</TableCell>
                                        <TableCell>
                                            {entry.projectName}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                                                {entry.wins}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <span className="mr-2">
                                                    {entry.hackCoins}
                                                </span>
                                                <motion.div
                                                    className="h-2 rounded-full bg-blue-500"
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${(entry.hackCoins / 2500) * 100}%`,
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        ease: "easeOut",
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{entry.members}</TableCell>
                                        <TableCell>
                                            <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-800">
                                                {entry.achievement}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
