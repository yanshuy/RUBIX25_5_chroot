import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

const teamData = [
    {
        teamName: "CodeCrafter",
        repoLink: "https://github.com/codeheroes/project",
    },
    {
        teamName: "InnovateX",
        repoLink: "https://github.com/techwarriors/solution",
    },
    {
        teamName: "CodeCrafter",
        repoLink: "https://github.com/codeheroes/project",
    },
    {
        teamName: "InnovateX",
        repoLink: "https://github.com/techwarriors/solution",
    },
    {
        teamName: "CodeCrafter",
        repoLink: "https://github.com/codeheroes/project",
    },
];

// Static data for graphs
const staticData = {
    CodeCrafter: {
        commitActivity: Array.from({ length: 36 }, (_, i) => ({
            hour: i,
            commits: Math.floor(Math.random() * 20),
        })),
        topContributors: [
            { login: "Emma Rodriguez", contributions: 120 },
            { login: "Alex Chen", contributions: 95 },
            { login: "Liam Nakamura", contributions: 80 },
            { login: "Sophia Patel", contributions: 65 },
            { login: "Noah Kim", contributions: 50 },
        ],
        languageUsage: [
            { name: "TypeScript", size: 60 },
            { name: "JavaScript", size: 20 },
            { name: "CSS", size: 10 },
            { name: "HTML", size: 10 },
        ],
    },
    InnovateX: {
        commitActivity: Array.from({ length: 36 }, (_, i) => ({
            hour: i,
            commits: Math.floor(Math.random() * 15),
        })),
        topContributors: [
            { login: "Aiden Gupta", contributions: 100 },
            { login: "Isabella Martinez", contributions: 85 },
            { login: "Ethan Wong", contributions: 70 },
            { login: "Olivia Blackwood", contributions: 55 },
            { login: "Mason Reyes", contributions: 40 },
        ],
        languageUsage: [
            { name: "TypeScript", size: 50 },
            { name: "JavaScript", size: 30 },
            { name: "CSS", size: 15 },
            { name: "HTML", size: 5 },
        ],
    },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface TeamCardProps {
    teamName: string;
    repoData: typeof staticData.CodeCrafter;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, repoData }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{teamName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Commit Activity (Last 36 Hours)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={repoData.commitActivity}>
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="commits"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Top Contributors
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={repoData.topContributors}>
                            <XAxis dataKey="login" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="contributions" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Language Usage
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={repoData.languageUsage}
                                dataKey="size"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {repoData.languageUsage.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

const TeamCommits: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {teamData.map((team, index) => (
                <TeamCard
                    key={`${team.teamName}-${index}`}
                    teamName={team.teamName}
                    repoData={
                        staticData[team.teamName as keyof typeof staticData]
                    }
                />
            ))}
        </div>
    );
};

export default TeamCommits;
