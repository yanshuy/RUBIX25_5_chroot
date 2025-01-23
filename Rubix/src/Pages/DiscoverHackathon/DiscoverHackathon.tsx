import { useEffect, useState } from "react";
import { Filters } from "./sections/Filters";
import { HackathonGrid } from "./sections/HackathonGrid";
import { HeroSection } from "./sections/HeroSection";
import { SiteHeader } from "./sections/SiteHeader";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../App";
import Loader from "../../components/Loader";

export interface Hackathon {
    id: string;
    name: string;
    type: string;
    theme: string;
    registration_status: "open" | "closed";
    start_date: string;
    end_date: string;
    participants_count: number;
    website?: string;
    social_links: string;
    banner: string;
}

// const hackathonsArr: Hackathon[] = [
//     {
//         id: "1",
//         name: "HackTU 6.0",
//         type: "Hackathon",
//         theme: "NO RESTRICTIONS",
//         status: "offline",
//         registrationStatus: "open",
//         startDate: "08/02/25",
//         participantsCount: 1000,
//         website: "https://hacktu.com",
//         socialLinks: "https://instagram.com/hacktu",
//         banner: "/placeholder.svg",
//     },
//     {
//         id: "2",
//         name: "KnowCode 2.0",
//         type: "Hackathon",
//         theme: "NO RESTRICTIONS",
//         status: "offline",
//         registrationStatus: "open",
//         startDate: "24/01/25",
//         participantsCount: 1000,
//         website: "https://knowcode.com",
//         socialLinks: "https://instagram.com/knowcode",
//         banner: "/placeholder.svg",
//     },
//     {
//         id: "3",
//         name: "Innerve 9.0",
//         type: "Hackathon",
//         theme: "NO RESTRICTIONS",
//         status: "offline",
//         registrationStatus: "open",
//         startDate: "07/02/25",
//         participantsCount: 1000,
//         website: "https://innerve.com",
//         socialLinks: "https://twitter.com/innerve",
//         banner: "/placeholder.svg",
//     },
// ];

async function getHackathon() {
    const response = await fetch(`${baseUrl}/api/core/hackathons/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${TOKEN}`,
            "ngrok-skip-browser-warning": "true",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function useHackathons() {
    return useQuery({
        queryFn: getHackathon,
        queryKey: ["hackathons"],
        refetchOnWindowFocus: false,
    });
}

export default function DiscoverHackathon() {
    const { data: hackathons, isLoading } = useHackathons();

    console.log(hackathons);
    const [filteredhackathons, setFilteredHackathons] = useState<Hackathon[]>();

    useEffect(() => {
        if (hackathons) {
            setFilteredHackathons(hackathons);
        }
    }, [hackathons]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen">
            <SiteHeader />
            <main>
                <HeroSection
                    hackathons={hackathons}
                    setHackathons={setFilteredHackathons}
                />
                <Filters
                    hackathons={hackathons}
                    setHackathons={setFilteredHackathons}
                />
                {filteredhackathons && (
                    <HackathonGrid hackathons={filteredhackathons} />
                )}
            </main>
        </div>
    );
}
