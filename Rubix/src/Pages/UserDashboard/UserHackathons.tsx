import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { baseUrl } from "../../App";
import { TbBrandBandcamp } from "react-icons/tb";
import { Link } from "react-router-dom";

interface Hackathon {
    id: string;
    hackathonName: string;
    participationStatus: "pending" | "shortlisted" | "rejected";
    about?: string;
    applicationCloseDate?: string;
}

interface FeaturedHackathon extends Hackathon {
    description: string;
    applicationDeadline: string;
}

interface StatusBadgeProps {
    status: Hackathon["participationStatus"];
}

const featuredHackathon: FeaturedHackathon = {
    id: "1",
    hackathonName: "ETHDenver 2025",
    participationStatus: "pending",
    description: "Largest and Longest Running #BUILDathon in the World",
    applicationDeadline: "24th February, 2025",
};

export default function UserHackathons() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);

    function StatusBadge({ status }: StatusBadgeProps) {
        const getStatusConfig = (status: Hackathon["participationStatus"]) => {
            switch (status) {
                case "pending":
                    return {
                        label: "PENDING",
                        className: "bg-yellow-100 text-yellow-800",
                    };
                case "shortlisted":
                    return {
                        label: "SHORTLISTED",
                        className: "bg-green-100 text-green-800",
                    };
                case "rejected":
                    return {
                        label: "REJECTED",
                        className: "bg-red-100 text-red-800",
                    };
                default:
                    return {
                        label: "UNKNOWN STATUS",
                        className: "bg-gray-100 text-gray-800",
                    };
            }
        };

        const config = getStatusConfig(status);
        return (
            <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${config.className}`}
            >
                {config.label}
            </span>
        );
    }

    useEffect(() => {
        const fetchHackathons = async () => {
            const accessToken = localStorage.getItem("accessToken");
            try {
                const response = await fetch(
                    `${baseUrl}/api/core/hackathons/participated`,
                    {
                        method: "GET",
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                if (!response.ok) throw new Error("Failed to fetch hackathons");
                const data = await response.json();
                setHackathons(data);
            } catch (error) {
                console.error("Error fetching hackathons:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHackathons();
    }, []);

    return (
        <div className="container space-y-8 p-6">
            {/* Featured Hackathon Card */}
            <div className="flex w-full max-w-6xl gap-4 p-4">
                <HackathonCard
                    title={"ETHDenver 2025"}
                    description={
                        "Largest and Longest Running #BUILDathon in the World"
                    }
                    applicationDeadline={
                        "Applications close 24th February, 2025"
                    }
                />
                <Link to={"/discover"}>
                    <div className="group relative h-[280px] w-80 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
                        <svg
                            className="absolute inset-0 h-full w-full"
                            viewBox="0 0 320 280"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id="cardGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#22c55e" />
                                    <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                                <clipPath id="cardClip">
                                    <path d="M0 16C0 7.16344 7.16344 0 16 0H304C312.837 0 320 7.16344 320 16V280H0V16Z" />
                                </clipPath>
                            </defs>

                            <rect
                                width="320"
                                height="280"
                                fill="url(#cardGradient)"
                                clipPath="url(#cardClip)"
                            />

                            <path
                                className="transition-transform duration-700 group-hover:translate-x-6"
                                d="M-40 80C40 50 120 110 200 80C280 50 360 90 440 80V0H-40V80Z"
                                fill="#22c55e"
                                fillOpacity="0.2"
                            />
                            <path
                                className="transition-transform duration-500 group-hover:translate-x-4"
                                d="M-40 60C40 30 120 90 200 60C280 30 360 70 440 60V0H-40V60Z"
                                fill="white"
                                fillOpacity="0.1"
                            />
                        </svg>

                        <div className="relative flex h-full flex-col items-center justify-center p-6">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg outline outline-4 outline-white transition-transform duration-300 group-hover:rotate-12">
                                <TbBrandBandcamp color="white" size={37} />
                            </div>

                            <div className="group-hover:scale-1 text-center transition-transform duration-300">
                                <h3 className="mb-1 text-3xl font-bold tracking-wide text-white">
                                    Explore
                                </h3>
                                <p className="text-xl font-medium text-white/90">
                                    Hackathons
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Hackathons List */}
            <div className="px-4">
                <h1 className="mb-6 text-2xl font-semibold">Your hackathons</h1>

                <div className="rounded-t-lg bg-gray-100">
                    <div className="grid grid-cols-12 gap-4 p-4 text-sm text-gray-500">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Hackathon</div>
                        <div className="col-span-4">Status</div>
                    </div>
                </div>

                <div className="divide-y rounded-b-lg border bg-white">
                    {loading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : hackathons.length > 0 ? (
                        hackathons.map((hackathon, index) => (
                            <Link
                                to={`/dashboard/hackathons/${hackathon.id}`}
                                key={hackathon.id}
                                className="block"
                            >
                                <div className="grid cursor-pointer grid-cols-12 items-center gap-4 p-4 hover:bg-gray-50">
                                    <div className="col-span-1 text-gray-500">
                                        {index + 1}.
                                    </div>
                                    <div className="col-span-5 font-medium">
                                        {hackathon.hackathonName}
                                    </div>
                                    <div className="col-span-4">
                                        <StatusBadge
                                            status={
                                                hackathon.participationStatus
                                            }
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Link
                                            to={`/hackathon/${hackathon.id}/interview`}
                                        >
                                            <Button
                                                className={
                                                    hackathon.participationStatus ==
                                                    "pending"
                                                        ? ""
                                                        : "hidden"
                                                }
                                                disabled={localStorage.getItem(
                                                    "interview",
                                                )}
                                            >
                                                {localStorage.getItem(
                                                    "interview",
                                                )
                                                    ? "Interview Taken"
                                                    : "Take Interview"}
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center">
                            No hackathons found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface HackathonCardProps {
    title: string;
    description: string;
    applicationDeadline: string;
}

const HackathonCard = ({
    title = "ETHDenver 2025",
    description = "Largest and Longest Running #BUILDathon in the World",
    applicationDeadline = "Applications close 24th February, 2025",
}: HackathonCardProps) => {
    return (
        <Card className="flex-1 bg-white p-6">
            <CardHeader className="p-0">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h2>
                    <ExternalLink className="h-5 w-5 text-blue-600" />
                </div>
            </CardHeader>
            <CardContent className="mt-2 p-0">
                <p className="text-gray-600">{description}</p>
                <p className="mt-4 text-gray-700">{applicationDeadline}</p>
            </CardContent>
            <CardFooter className="mt-4 p-0">
                <Button
                    variant="default"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    Go to dashboard
                </Button>
            </CardFooter>
        </Card>
    );
};
