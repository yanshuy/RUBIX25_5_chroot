import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import type { TeamMember } from "../Register";

const suggestedTeammates: TeamMember[] = [
    {
        id: "2",
        fullName: "Vinayak Mohanty",
        email: "vinayak97696@gmail.com",
        college: "Thadomal Shahani Engineering College (TSEC), Mumbai",
        skills: ["UI/UX", "Frontend"],
        status: "not_added",
    },
    {
        id: "3",
        fullName: "Devansh Nair",
        email: "devanshnair.05@gmail.com",
        college: "Thadomal Shahani Engineering College (TSEC), Mumbai",
        skills: ["Backend", "Database"],
        status: "not_added",
    },
    {
        id: "4",
        fullName: "Vaibhav Sharma",
        email: "vaibhavsharmas021@gmail.com",
        college: "Thadomal Shahani Engineering College (TSEC), Mumbai",
        skills: ["Mobile", "Cloud"],
        status: "not_added",
    },
];

export function TeammateSuggestions({
    addMember,
}: {
    addMember: (member: TeamMember) => void;
}) {
    const [search, setSearch] = useState("");

    const filteredTeammates = suggestedTeammates.filter(
        (teammate) =>
            teammate.fullName.toLowerCase().includes(search.toLowerCase()) ||
            (teammate.skills.some((skill) =>
                skill.toLowerCase().includes(search.toLowerCase()),
            ) &&
                teammate.status === "not_added"),
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Find Teammates
                    <Badge variant="secondary" className="rounded-full">
                        <Info className="mr-1 h-3 w-3" />
                        Based on past collaborations
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or skills..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filteredTeammates.map((teammate) => (
                        <Card key={teammate.id}>
                            <CardContent className="flex items-center gap-4 p-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-primary/10">
                                        {teammate.fullName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">
                                                {teammate.fullName}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {teammate.email}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {teammate.college}
                                            </p>
                                        </div>
                                        {/* <Button size="sm" onClick={()=>{
                      suggestedTeammates.find((teammate) => teammate.id === teammate.id)!.status = "pending"
                      addMember(teammate)
                      }} disabled={teammate.status != "not_added"} className>Add</Button> */}
                                        <button
                                            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                                            onClick={() => {
                                                suggestedTeammates.find(
                                                    (tm) =>
                                                        tm.id === teammate.id,
                                                )!.status = "pending";
                                                filteredTeammates.find(
                                                    (tm) =>
                                                        tm.id === teammate.id,
                                                )!.status = "pending";
                                                console.log(teammate);
                                                addMember(teammate);
                                            }}
                                            disabled={
                                                teammate.status != "not_added"
                                            }
                                        >
                                            {teammate.status != "not_added"
                                                ? "Added"
                                                : "Add"}
                                        </button>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        {teammate.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="outline"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
