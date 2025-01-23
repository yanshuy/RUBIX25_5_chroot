import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Plus } from "lucide-react";
import { Team } from "../Register";
import { useParams } from "react-router-dom";
import { useHackathonData } from "../../HackathonInfo/HackathonInfo";

export function TeamForm({
    team,
    setTeam,
}: {
    team: Team;
    setTeam: (team: Team) => void;
}) {
    const [error, setError] = useState("");
    const { id } = useParams();
    const { data, isLoading } = useHackathonData(id ?? "1");
    console.log(team);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Team Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input
                            id="team-name"
                            placeholder="Enter your team name"
                            value={team.name}
                            onChange={(e) => {
                                setTeam({ ...team, name: e.target.value });
                                setError(
                                    e.target.value
                                        ? ""
                                        : "Team name is required",
                                );
                            }}
                        />
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>
                                Team Members ({team.members.length}/
                                {data ? data.maxMembers : "fetching..."})
                            </Label>
                            <span className="text-sm text-muted-foreground">
                                You can add up to{" "}
                                {data?.maxMembers - team.members.length}{" "}
                                additional members
                            </span>
                        </div>

                        <div className="space-y-4">
                            {team.members.map((member) => (
                                <Card key={member.id}>
                                    <CardContent className="flex items-center gap-4 p-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback className="bg-primary/10">
                                                {member.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-medium">
                                                        {member.fullName}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {member.email}
                                                    </p>
                                                    {member.phone && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {member.mobile}
                                                        </p>
                                                    )}
                                                </div>
                                                <Badge
                                                    variant={
                                                        member.status ===
                                                        "verified"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {member.status ===
                                                    "verified"
                                                        ? "Verified"
                                                        : "Pending"}
                                                </Badge>
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                {member.skills &&
                                                    member.skills.map(
                                                        (skill) => (
                                                            <Badge
                                                                key={skill}
                                                                variant="outline"
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ),
                                                    )}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* <Button
                                variant="outline"
                                className="w-full"
                                disabled={team.members.length >= team.maxSize}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Team Member
                            </Button> */}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
