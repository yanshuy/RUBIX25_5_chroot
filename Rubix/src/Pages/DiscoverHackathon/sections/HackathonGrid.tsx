import { HackathonCard } from "../../../components/HackathonCard";

export interface Hackathon {
    id: string;
    name: string;
    type: string;
    theme: string;
    status: "offline" | "online";
    registrationStatus: "open" | "closed";
    startDate: string;
    participantsCount: number;
    socialLinks: {
        website?: string;
        instagram?: string;
        twitter?: string;
        facebook?: string;
    };
    thumbnailUrl: string;
}

const hackathons: Hackathon[] = [
    {
        id: "1",
        name: "HackTU 6.0",
        type: "Hackathon",
        theme: "NO RESTRICTIONS",
        status: "offline",
        registrationStatus: "open",
        startDate: "08/02/25",
        participantsCount: 1000,
        socialLinks: {
            website: "https://hacktu.com",
            instagram: "https://instagram.com/hacktu",
        },
        thumbnailUrl: "/placeholder.svg",
    },
    {
        id: "2",
        name: "KnowCode 2.0",
        type: "Hackathon",
        theme: "NO RESTRICTIONS",
        status: "offline",
        registrationStatus: "open",
        startDate: "24/01/25",
        participantsCount: 1000,
        socialLinks: {
            website: "https://knowcode.com",
            instagram: "https://instagram.com/knowcode",
        },
        thumbnailUrl: "/placeholder.svg",
    },
    {
        id: "3",
        name: "Innerve 9.0",
        type: "Hackathon",
        theme: "NO RESTRICTIONS",
        status: "offline",
        registrationStatus: "open",
        startDate: "07/02/25",
        participantsCount: 1000,
        socialLinks: {
            website: "https://innerve.com",
            twitter: "https://twitter.com/innerve",
        },
        thumbnailUrl: "/placeholder.svg",
    },
    {
        id: "4",
        name: "TSEC HACKS 2025",
        type: "Hackathon",
        theme: "NO RESTRICTIONS",
        status: "offline",
        registrationStatus: "open",
        startDate: "29/01/25",
        participantsCount: 1000,
        socialLinks: {
            website: "https://tsechacks.com",
            facebook: "https://facebook.com/tsechacks",
        },
        thumbnailUrl: "/placeholder.svg",
    },
];

export function HackathonGrid() {
    return (
        <div className="px-12 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hackathons.map((hackathon) => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
            </div>
        </div>
    );
}
