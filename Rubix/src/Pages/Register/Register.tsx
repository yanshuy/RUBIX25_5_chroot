import { TeamHeader } from "./sections/TeamHeader";
import { TeamForm } from "./sections/TeamForm";
import { TeammateSuggestions } from "./sections/TeamSuggestions";
import { useState } from "react";
import LeaderForm from "./sections/LeaderForm";
import { useHackathonData } from "../HackathonInfo/HackathonInfo";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../App";

export interface TeamMember {
    id: string;
    fullName: string;
    email: string;
    mobile?: string;
    college: string;
    skills: string[];
    avatar?: string;
    status: "verified" | "pending" | "not_added";
}

export interface Team {
    name: string;
    members: TeamMember[];
    maxSize: number;
}

export type formData = {
    email: string;
    mobile: string;
    fullName: string;

    gender: string;
};

export default function HackathonRegister() {
    const { id } = useParams();
    // const { data, isLoading } = useHackathonData(params.id ?? "1");
    const [formData, setFormData] = useState<formData>({
        email: "",
        mobile: "",
        fullName: "",
        gender: "",
    });

    const [activeTab, setActiveTab] = useState("LDetails");
    const [team, setTeam] = useState<Team>([]);
    function addMember(member: TeamMember) {
        setTeam({ ...team, members: [...team.members, member] });
    }

    async function onUploadDetails() {
        const data = {
            team: team,
            leader: formData,
        };

        await fetch(`${baseUrl}/api/core/hackathons/${id}/register/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data.team.name),
        });

        await fetch(`${baseUrl}/api/core/invitations/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ hackathon: id, invitee: [1, 2, 3] }),
        });
        console.log(data);
    }
    return (
        <div className="min-h-screen bg-slate-100">
            <TeamHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onUploadDetails={onUploadDetails}
            />
            {activeTab == "LDetails" ? (
                <LeaderForm
                    formData={formData}
                    setFormData={setFormData}
                    setActiveTab={setActiveTab}
                    setTeam={setTeam}
                />
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
