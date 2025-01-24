import { useState } from "react";
import Announcements from "./channels/Announcement";
import Documentation from "./channels/Documentation";
import Mentorship from "./channels/Mentorship";
import GeneralChat from "./channels/GeneralChat";
import Ideation from "./channels/Ideation";
import TechnicalHelp from "./channels/TechnicalHelp";
import Schedule from "./channels/Schedule";
import Judging from "./channels/Judging";
import Sidebar from "./sections/sidebar";
import TopBar from "./sections/TopBar";
import MembersList from "./sections/MembersList";
import Submissions from "./channels/Submissions";
import Challenges from "./channels/Challenges";
import { useHackathonData } from "../HackathonInfo/HackathonInfo";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../App";
import { useQuery } from "@tanstack/react-query";
import TeamChat from "./channels/TeamChat";
import RoomPage from "../Videocalling/RoomPage";

export type Channel = {
    id: string;
    name: string;
    category: string;
    description: string;
    unreadCount?: number;
};

async function getCombinedTeamData(hackathonId: string) {
    // First get team ID
    const teamIdResponse = await fetch(
        `${baseUrl}/api/core/teams/my?hackathon_id=${hackathonId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "ngrok-skip-browser-warning": "69420",
            },
        },
    );

    if (!teamIdResponse.ok) {
        throw new Error("Failed to fetch team ID");
    }

    const { team_id: teamId } = await teamIdResponse.json();

    // Then get team details using the ID
    const detailsResponse = await fetch(`${baseUrl}/api/core/teams/${teamId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "ngrok-skip-browser-warning": "69420",
        },
    });

    if (!detailsResponse.ok) {
        throw new Error("Failed to fetch team details");
    }

    const teamDetails = await detailsResponse.json();

    return {
        teamId,
        teamDetails,
    };
}

export function useTeamData(hackathonId: string) {
    return useQuery({
        queryKey: ["teamData", hackathonId],
        queryFn: () => getCombinedTeamData(hackathonId),
        enabled: !!hackathonId,
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
    const { data: teamData } = useTeamData(params.id ?? "1");
    const { data } = useHackathonData(params.id ?? "1");

    console.log(teamData);

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
                return <GeneralChat id={params.id} />;
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
            case "team":
                return <TeamChat id={teamData?.teamId} />;
            case "team-voice":
                return <RoomPage />;
            default:
                return <div>Channel not found</div>;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                data={data}
                teamData={teamData}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
            />
            <div className="flex flex-1 flex-col">
                {/* <ServerBanner /> */}
                <TopBar activeChannel={activeChannel} />
                <div className="flex max-h-[92vh] flex-1">
                    <div className="basis-full overflow-y-scroll">
                        {renderChannel()}
                    </div>

                    <MembersList />
                </div>
            </div>
        </div>
    );
}
