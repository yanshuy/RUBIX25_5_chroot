"use client";

import { useState } from "react";
import { ChevronRight, Github, Check, X, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notification from "../../components/Notification";
// import { Notification } from "../../components/Notification";



// Types
interface TeamMember {
    name: string;
    role: string;
    githubScore: number;
    githubLink: string;
    resumeLink: string;
}

interface Team {
    id: number;
    teamName: string;
    teamLead: TeamMember;
    members: TeamMember[];
    domainPreference: string;
    status: "shortlisted" | "pending" | "not_shortlisted";
}

// Mock Data
const initialTeams: Team[] = [
    {
        id: 1,
        teamName: "TechNinjas",
        teamLead: {
            name: "John Doe",
            role: "Team Lead",
            githubScore: 850,
            githubLink: "https://github.com/johndoe",
            resumeLink: "/resumes/john-doe.pdf",
        },
        members: [
            {
                name: "Jane Smith",
                role: "Developer",
                githubScore: 720,
                githubLink: "https://github.com/janesmith",
                resumeLink: "/resumes/jane-smith.pdf",
            },
            {
                name: "Mike Johnson",
                role: "Designer",
                githubScore: 650,
                githubLink: "https://github.com/mikejohnson",
                resumeLink: "/resumes/mike-johnson.pdf",
            },
        ],
        domainPreference: "AI/ML",
        status: "shortlisted",
    },
    {
        id: 2,
        teamName: "CodeCrafters",
        teamLead: {
            name: "Sarah Wilson",
            role: "Team Lead",
            githubScore: 780,
            githubLink: "https://github.com/sarahwilson",
            resumeLink: "/resumes/sarah-wilson.pdf",
        },
        members: [
            {
                name: "Tom Brown",
                role: "Backend Developer",
                githubScore: 690,
                githubLink: "https://github.com/tombrown",
                resumeLink: "/resumes/tom-brown.pdf",
            },
        ],
        domainPreference: "Web3",
        status: "pending",
    },
];

export default function Teams() {
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [activeTab, setActiveTab] = useState("all");
    const [notification, setNotification] = useState<string | null>(null);

    const filteredTeams = teams.filter((team) => {
        if (activeTab === "all") return true;
        if (activeTab === "shortlisted") return team.status === "shortlisted";
        if (activeTab === "not_shortlisted")
            return team.status === "not_shortlisted";
        if (activeTab === "pending") return team.status === "pending";
        return true;
    });
    

    


    const updateTeamStatus = async (teamId: number, newStatus: Team["status"]) => {
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === teamId ? { ...team, status: newStatus } : team,
            ),
        );

        const formData = teams.map((team) => (
          team.id === teamId ? { ...team, status: newStatus } : team
        ))

        console.log(formData);
        






        const statusMessages = {
            shortlisted: "Team has been shortlisted",
            not_shortlisted: "Team has been marked as not shortlisted",
            pending: "Team has been marked as pending review",
        };

        setNotification(statusMessages[newStatus]);
    };

    const getStatusBadge = (status: Team["status"]) => {
        const variants = {
            shortlisted: "bg-green-100 text-green-800 hover:bg-green-100",
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            not_shortlisted: "bg-red-100 text-red-800 hover:bg-red-100",
        };
        const labels = {
            shortlisted: "Shortlisted",
            pending: "Pending Review",
            not_shortlisted: "Not Shortlisted",
        };
        return (
            <Badge className={variants[status]} variant="secondary">
                {labels[status]}
            </Badge>
        );
    };

    const getStatusIcon = (status: Team["status"]) => {
        const icons = {
            shortlisted: <Check className="h-4 w-4 text-green-600" />,
            pending: <Clock className="h-4 w-4 text-yellow-600" />,
            not_shortlisted: <X className="h-4 w-4 text-red-600" />,
        };
        return icons[status];
    };
    
    return (
        <div className="container mx-auto bg-slate-50 px-8 py-5">
            <h1 className="mb-10 text-center text-4xl font-bold text-slate-900">
                TEAMS
            </h1>
            <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={setActiveTab}
            >
                <TabsList className="mb-3 grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Teams</TabsTrigger>
                    <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="not_shortlisted">
                        Not Shortlisted
                    </TabsTrigger>
                    <TabsTrigger value="pending">Pending Review</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        #
                                    </TableHead>
                                    <TableHead>Team Name</TableHead>
                                    <TableHead>Team Lead</TableHead>
                                    <TableHead>Domain Preference</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                    <TableHead className="text-right">
                                        View Profile
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTeams.map((team) => (
                                    <TableRow key={team.id}>
                                        <TableCell>{team.id}</TableCell>
                                        <TableCell className="font-medium">
                                            {team.teamName}
                                        </TableCell>
                                        <TableCell>
                                            {team.teamLead.name}
                                        </TableCell>
                                        <TableCell>
                                            {team.domainPreference}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(team.status)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="flex items-center gap-2"
                                                    >
                                                        {getStatusIcon(
                                                            team.status,
                                                        )}
                                                        <span>
                                                            Change Status
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            updateTeamStatus(
                                                                team.id,
                                                                "shortlisted",
                                                            )
                                                        }
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span>
                                                            Shortlist Team
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            updateTeamStatus(
                                                                team.id,
                                                                "not_shortlisted",
                                                            )
                                                        }
                                                        className="flex items-center gap-2"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span>
                                                            Mark as Not
                                                            Shortlisted
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            updateTeamStatus(
                                                                team.id,
                                                                "pending",
                                                            )
                                                        }
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Clock className="h-4 w-4" />
                                                        <span>
                                                            Mark as Pending
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setSelectedTeam(team)
                                                }
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog
                open={!!selectedTeam}
                onOpenChange={() => setSelectedTeam(null)}
            >
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            Team Profile: {selectedTeam?.teamName}
                            {selectedTeam &&
                                getStatusBadge(selectedTeam.status)}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6">
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Team Lead
                            </h3>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <p className="font-medium">
                                            {selectedTeam?.teamLead.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {selectedTeam?.teamLead.role}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Github className="h-4 w-4" />
                                            <span className="font-medium">
                                                {
                                                    selectedTeam?.teamLead
                                                        .githubScore
                                                }
                                            </span>
                                        </div>
                                        <Button variant="outline" asChild>
                                            <a
                                                href={
                                                    selectedTeam?.teamLead
                                                        .resumeLink
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a
                                                href={
                                                    selectedTeam?.teamLead
                                                        .githubLink
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                GitHub Profile
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Team Members
                            </h3>
                            <div className="grid gap-4">
                                {selectedTeam?.members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {member.role}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Github className="h-4 w-4" />
                                                <span className="font-medium">
                                                    {member.githubScore}
                                                </span>
                                            </div>
                                            <Button variant="outline" asChild>
                                                <a
                                                    href={member.resumeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Resume
                                                </a>
                                            </Button>
                                            <Button variant="outline" asChild>
                                                <a
                                                    href={member.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    GitHub Profile
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {notification && (
                <Notification
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}
