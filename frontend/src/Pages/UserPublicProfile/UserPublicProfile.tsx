import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    EnvelopeClosedIcon,
    FileIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import { baseUrl } from "../../App";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

function getUserProfile(id: string) {
    return fetch(`${baseUrl}/api/users/${id}`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res) => res.json());
}

export function useUserProfile(id: string) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserProfile(id),
    });
}

export default function UserPublicProfile() {
    const param = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const { data, isLoading } = useUserProfile(param.id ?? "1");

    console.log(data);

    if (isLoading) {
        return <Loader />;
    }

    const user = {
        full_name: "Jane Doe",
        email: "jane.doe@example.com",
        bio: "Passionate developer and hackathon enthusiast. Always ready to tackle new challenges and create innovative solutions.",
        github: "janedoe",
        linkedin: "jane-doe",
        github_score: 85,
        skills: [
            "React",
            "Node.js",
            "Python",
            "Machine Learning",
            "UI/UX Design",
        ],
        past_hackathons: [
            {
                name: "Global AI Hackathon",
                date: "May 2023",
                position: "1st Place",
            },
            {
                name: "Climate Tech Challenge",
                date: "February 2023",
                position: "2nd Place",
            },
            {
                name: "HealthTech Innovate",
                date: "November 2022",
                position: "Finalist",
            },
        ],
        upcoming_hackathons: [
            { name: "Blockchain Revolution", date: "August 15-17, 2023" },
        ],
        achievements: [
            { name: "AI Master", icon: "🤖" },
            { name: "Team Player", icon: "🤝" },
            { name: "Innovation Guru", icon: "💡" },
        ],
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <Card className="mx-auto max-w-screen-xl">
                <CardContent className="p-6">
                    <div className="flex h-full flex-col gap-16 md:flex-row">
                        <div className="md:w-1/3">
                            <div className="relative mb-4">
                                <img
                                    src="https://imgs.search.brave.com/Gh-2D7gzKlftfRyShAHT-8izz4lLQunpy_hE-NpSjfo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93M2ltYWdlcy9h/dmF0YXI2LnBuZw"
                                    alt={data?.full_name}
                                    className="mx-auto h-48 w-48 rounded-full border-4 border-slate-300 object-cover"
                                />
                                <Badge className="absolute bottom-2 right-2 bg-slate-600">
                                    <RocketIcon className="mr-1" />
                                    Pro Hacker
                                </Badge>
                            </div>
                            <h1 className="mb-2 text-center text-2xl font-bold">
                                {data?.full_name}
                            </h1>
                            <p className="mb-4 text-center text-slate-600">
                                {data?.bio ??
                                    "Passionate developer and hackathon enthusiast. Always ready to tackle new challenges and create innovative solutions."}
                            </p>
                            <div className="mb-4 mt-12 flex justify-center space-x-2">
                                <a
                                    href={`${data?.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="icon">
                                        <GitHubLogoIcon className="h-4 w-4" />
                                    </Button>
                                </a>
                                <a
                                    href={`${data?.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${data?.linkedin ? "" : "opacity-40"}`}
                                >
                                    <Button variant="outline" size="icon">
                                        <LinkedInLogoIcon className="h-4 w-4" />
                                    </Button>
                                </a>
                                <a
                                    href={`mailto:${data?.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="icon">
                                        <EnvelopeClosedIcon className="h-4 w-4" />
                                    </Button>
                                </a>
                            </div>
                            <Button className="w-full bg-slate-800 hover:bg-slate-700">
                                Contact
                            </Button>
                        </div>
                        <div className="h-full md:w-2/3">
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="h-full w-full"
                            >
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="overview">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="hackathons">
                                        Hackathons
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements">
                                        Achievements
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="overview"
                                    className="fuc mt-4 h-full"
                                >
                                    <Card className="h-full">
                                        <CardHeader>
                                            <CardTitle>Skills & Info</CardTitle>
                                        </CardHeader>
                                        <CardContent className="h-full">
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="mb-2 font-semibold">
                                                        Skills
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {data?.skills.map(
                                                            (skill) => (
                                                                <Badge
                                                                    key={skill}
                                                                    variant="secondary"
                                                                >
                                                                    {skill.replace(
                                                                        /'/g,
                                                                        "",
                                                                    )}
                                                                </Badge>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 font-semibold">
                                                        GitHub Score
                                                    </h3>
                                                    <Progress
                                                        value={
                                                            (data?.github_score /
                                                                1000) *
                                                            100
                                                        }
                                                        className="w-full"
                                                    />
                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {data?.github_score /
                                                            10}
                                                        /100
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-12">
                                                <h3 className="mb-2 font-semibold">
                                                    Contact & Links
                                                </h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center">
                                                        <EnvelopeClosedIcon className="mr-2" />{" "}
                                                        {data?.email}
                                                    </li>
                                                    <li className="flex items-center">
                                                        <GitHubLogoIcon className="mr-2" />{" "}
                                                        <a
                                                            href={`
                                                        ${data?.github}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {data?.github}
                                                        </a>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <LinkedInLogoIcon className="mr-2" />{" "}
                                                        {data?.linkedin
                                                            ? `linkedin.com/in/${data?.linkedin}`
                                                            : "not provided"}
                                                    </li>
                                                    <li className="flex items-center">
                                                        <FileIcon className="mr-2" />
                                                        <a href={data?.resume}>
                                                            <Button
                                                                variant="link"
                                                                className="h-auto p-0"
                                                            >
                                                                View Resume
                                                            </Button>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent
                                    value="hackathons"
                                    className="mt-4"
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Hackathon History
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="mb-2 font-semibold">
                                                        Upcoming Hackathons
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {user.upcoming_hackathons.map(
                                                            (
                                                                hackathon,
                                                                index,
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-center justify-between rounded bg-slate-100 p-2"
                                                                >
                                                                    <span>
                                                                        {
                                                                            hackathon.name
                                                                        }
                                                                    </span>
                                                                    <span className="text-sm text-slate-600">
                                                                        {
                                                                            hackathon.date
                                                                        }
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 font-semibold">
                                                        Past Hackathons
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {user.past_hackathons.map(
                                                            (
                                                                hackathon,
                                                                index,
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-center justify-between rounded bg-slate-100 p-2"
                                                                >
                                                                    <span>
                                                                        {
                                                                            hackathon.name
                                                                        }
                                                                    </span>
                                                                    <div className="text-right">
                                                                        <span className="block text-sm text-slate-600">
                                                                            {
                                                                                hackathon.date
                                                                            }
                                                                        </span>
                                                                        <Badge variant="secondary">
                                                                            {
                                                                                hackathon.position
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent
                                    value="achievements"
                                    className="mt-4"
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Achievements & Badges
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                {user.achievements.map(
                                                    (achievement, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col items-center rounded bg-slate-100 p-4"
                                                        >
                                                            <span className="mb-2 text-4xl">
                                                                {
                                                                    achievement.icon
                                                                }
                                                            </span>
                                                            <span className="text-center font-semibold">
                                                                {
                                                                    achievement.name
                                                                }
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
