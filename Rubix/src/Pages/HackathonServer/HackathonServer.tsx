import { useState } from "react";
import Announcements from "./channels/Announcement";
import Documentation from "./channels/Documentation";
import Mentorship from "./channels/Mentorship";
import GeneralChat from "./channels/GeneralChat";
import Ideation from "./channels/Ideation";
import TechnicalHelp from "./channels/TechnicalHelp";
import Schedule from "./channels/Schedule";
import Judging from "./channels/Judging";
import ServerBanner from "./sections/ServerBanner";
import Sidebar from "./sections/sidebar";
import TopBar from "./sections/TopBar";
import MembersList from "./sections/MembersList";
import Submissions from "./channels/Submissions";
import Challenges from "./channels/Challenges";
import { useHackathonData } from "../HackathonInfo/HackathonInfo";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../App";
import { useQuery } from "@tanstack/react-query";

export type Channel = {
    id: string;
    name: string;
    category: string;
    description: string;
    unreadCount?: number;
};

async function getHackathonTeamId(id: string): Promise<string> {
    const response = await fetch(
        baseUrl + `/api/core/teams/my?hackathon_id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "ngrok-skip-browser-warning": "69420",
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch team ID");
    }

    const data = await response.json();
    return data.id; // Make sure the API returns an object with an 'id' field
}

async function getTeamDetails(id: string) {
    const response = await fetch(baseUrl + `/api/core/teams/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "ngrok-skip-browser-warning": "69420",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch team details");
    }

    return response.json();
}

export function useHackathonTeamId(id: string) {
    return useQuery({
        queryKey: ["hackathonTeamId", id],
        queryFn: () => getHackathonTeamId(id),
        // Ensure we have a valid ID before fetching
        enabled: !!id,
    });
}

export function useTeamDetails(id: string | undefined) {
    return useQuery({
        queryKey: ["teamDetails", id],
        queryFn: () => {
            if (!id) throw new Error("No team ID provided");
            return getTeamDetails(id);
        },
        // Only fetch when ID is available
        enabled: !!id,
    });
}

export default function HackathonServer() {
    const [activeChannel, setActiveChannel] = useState<Channel>({
        id: "announcements",
        name: "Announcements",
        category: "Getting Started",
        description: "Important updates and announcements for all participants",
    });
    const params = useParams();
    const { data: teamDetails } = useTeamDetails(params.id ?? "1");
    const { data } = useHackathonData(params.id ?? "1");

    // console.log(teamId, teamDetails);

    const renderChannel = () => {
        switch (activeChannel.id) {
            case "announcements":
                return <Announcements />;

            case "challenges":
                return <Challenges />;
            case "documentation":
                return <Documentation />;

            case "mentorship":
                return <Mentorship />;
            case "general":
                return <GeneralChat />;
            case "ideation":
                return <Ideation />;
            case "technical":
                return <TechnicalHelp />;
            case "schedule":
                return <Schedule />;
            case "submissions":
                return <Submissions />;
            case "judging":
                return <Judging />;
            default:
                return <div>Channel not found</div>;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                data={data}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
            />
            <div className="flex flex-1 flex-col">
                {/* <ServerBanner /> */}
                <TopBar activeChannel={activeChannel} />
                <div className="flex flex-1 overflow-hidden">
                    {renderChannel()}
                    <MembersList />
                </div>
            </div>
        </div>
    );
}
