import { TeamHeader } from "./sections/TeamHeader";

import { TeamForm } from "./sections/TeamForm";
import { TeammateSuggestions } from "./sections/TeamSuggestions";
import { useState } from "react";
import LeaderForm from "./sections/LeaderForm";

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone?: string;
    college: string;
    skills: string[];
    role?: string;
    avatar?: string;
    status: "verified" | "pending" | "not_added";
}

export interface Team {
    name: string;
    members: TeamMember[];
    maxSize: number;
}

const initialTeam: Team = {
    name: "",
    members: [
        {
            id: "1",
            name: "Yanshuman Yadav",
            email: "yanshuman@example.com",
            phone: "+919082474842",
            college: "Woxsen University",
            skills: ["React", "Node.js"],
            status: "verified",
        },
    ],
    maxSize: 5,
};

export default function HackathonRegister() {
    const [activeTab, setActiveTab] = useState("LDetails");
    const [team, setTeam] = useState<Team>(initialTeam);
    function addMember(member: TeamMember) {
        setTeam({ ...team, members: [...team.members, member] });
    }
    return (
        <div className="min-h-screen bg-slate-100">
            <TeamHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab == "LDetails" ? (
                <LeaderForm />
            ) : (
                <div className="mx-auto max-w-[1350px] py-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <TeamForm team={team} setTeam={setTeam} />
                        <div className="space-y-6">
                            <TeammateSuggestions addMember={addMember} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
