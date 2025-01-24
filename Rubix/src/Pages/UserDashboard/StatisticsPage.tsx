import {
    FaCoins,
    FaTrophy,
    FaUserFriends,
    FaProjectDiagram,
    FaClock,
    FaUsers,
} from "react-icons/fa";

const statisticsData = [
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
];

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
            </div>
            <div className="mt-16 text-center">
                <p className="text-xl text-gray-600">
                    Keep hacking, keep innovating, and watch your stats grow!
                </p>
            </div>
        </div>
    );
}
