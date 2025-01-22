import { useState } from "react";
import Announcements from "./channels/Announcement";
import Challenges from "./channels/challenges";
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

export type Channel = {
    id: string;
    name: string;
    category: string;
    description: string;
    unreadCount?: number;
};

export default function HackathonServer() {
    const [activeChannel, setActiveChannel] = useState<Channel>({
        id: "announcements",
        name: "Announcements",
        category: "Getting Started",
        description: "Important updates and announcements for all participants",
    });

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
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
            />
            <div className="flex flex-1 flex-col">
                <ServerBanner />
                <TopBar activeChannel={activeChannel} />
                <div className="flex flex-1 overflow-hidden">
                    {renderChannel()}
                    <MembersList />
                </div>
            </div>
        </div>
    );
}
