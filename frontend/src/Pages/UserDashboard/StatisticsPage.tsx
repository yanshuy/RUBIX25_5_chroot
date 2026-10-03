import { useState, useEffect } from "react";
import {
    FaCoins,
    FaTrophy,
    FaUserFriends,
    FaProjectDiagram,
    FaClock,
    FaUsers,
} from "react-icons/fa";
import { baseUrl } from "../../App";
import { Button } from "@/components/ui/button";

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div
            className={`flex transform flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-lg transition duration-500 hover:scale-105`}
        >
            <div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${color}`}
            >
                <Icon className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
                {title === "Time Spent Hacking" ? `${value} hrs` : value}
            </p>
        </div>
    );
};

export default function StatisticsPage() {
    const [statisticsData, setStatisticData] = useState([
        {
            id: 1,
            title: "Hack Coins",
            value: 100,
            icon: FaCoins,
            color: "from-yellow-400 to-yellow-600",
        },
        {
            id: 2,
            title: "Hackathons Won",
            value: 0,
            icon: FaTrophy,
            color: "from-green-400 to-green-600",
        },
        {
            id: 3,
            title: "Hackathons Participated",
            value: 0,
            icon: FaUserFriends,
            color: "from-blue-400 to-blue-600",
        },
        {
            id: 4,
            title: "Projects Submitted",
            value: 0,
            icon: FaProjectDiagram,
            color: "from-purple-400 to-purple-600",
        },
        {
            id: 5,
            title: "Time Spent Hacking",
            value: 0,
            icon: FaClock,
            color: "from-red-400 to-red-600",
        },
        {
            id: 6,
            title: "Team Collaborations",
            value: 0,
            icon: FaUsers,
            color: "from-red-400 to-red-600",
        },
    ]);

    const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${baseUrl}/api/hackathons/count/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "ngrok-skip-browser-warning": "true",
            },
        });

        const data = await response.json();
        console.log(`stats ka data ${data}`);
        console.log(data);

        const updatedStatisticsData = statisticsData.map((stat) => {
            if (stat.title === "Hack Coins") {
                return { ...stat, value: data.participation_count * 100 + 100 };
            } else if (stat.title === "Hackathons Won") {
                return { ...stat, value: 0 };
            } else if (stat.title === "Hackathons Participated") {
                return { ...stat, value: data.participation_count };
            } else if (stat.title === "Projects Submitted") {
                return { ...stat, value: data.participation_count };
            } else if (stat.title === "Time Spent Hacking") {
                return { ...stat, value: data.participation_count * 24 };
            } else if (stat.title === "Team Collaborations") {
                return { ...stat, value: data.participation_count };
            }
            return stat;
        });

        setStatisticData(updatedStatisticsData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRedeemCoins = () => {
        // Implement the redeem coins functionality here
        console.log("Redeem Hack Coins clicked");
        // You can add a modal or navigate to a new page for redeeming coins
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-50 to-pink-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-12 text-center text-4xl font-extrabold text-gray-900">
                    Your Hackathon Journey
                </h1>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {statisticsData.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={handleRedeemCoins}
                        className="transform rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                    >
                        Redeem Hack Coins
                    </Button>
                </div>
            </div>
            <div className="mt-16 text-center">
                <p className="text-xl text-gray-600">
                    Keep hacking, keep innovating, and watch your stats grow!
                </p>
            </div>
        </div>
    );
}
