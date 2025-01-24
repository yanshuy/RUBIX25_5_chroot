import { Users, Video, Clipboard, Check } from "lucide-react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500">
            {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

interface MetricCardProps {
    value: string;
    label: string;
}

const MetricCard = ({ value, label }: MetricCardProps) => (
    <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="mb-1 text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

export default function LandingPageFeature() {
    const features = [
        {
            icon: <Users className="h-6 w-6 text-gray-100" />,
            title: "Smart Team Formation",
            description:
                "AI-powered matchmaking system that connects participants based on complementary skills and shared interests.",
        },
        {
            icon: <Video className="h-6 w-6 text-gray-100" />,
            title: "Real-Time Collaboration",
            description:
                "Seamlessly communicate and work together with integrated chat, video calls, and shared workspaces.",
        },
        // {
        //     icon: <Clipboard className="h-6 w-6 text-gray-100" />,
        //     title: "Project Tracking",
        //     description:
        //         "Comprehensive project management with version control and progress tracking capabilities.",
        // },
    ];

    const metrics = [
        { value: "98%", label: "Accuracy Rate" },
        { value: "5x", label: "Faster Processing" },
        { value: "24/7", label: "Availability" },
        { value: "100+", label: "Parameters" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                        Smart Features for Modern Hackathons
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Experience next-generation hackathon management with our
                        intelligent features designed to enhance collaboration
                        and productivity.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="mb-16 grid  gap-16 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>

                {/* AI Interview System Section */}
                <div className="rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800">
                        AI-Powered Interview System
                    </h2>
                    <p className="mb-8 text-gray-600">
                        Our advanced AI interview system helps organizers
                        efficiently evaluate and shortlist candidates based on
                        custom criteria.
                    </p>

                    {/* Metrics Grid */}
                    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {metrics.map((metric, index) => (
                            <MetricCard key={index} {...metric} />
                        ))}
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                        {[
                            "Automated skill assessment",
                            "Customizable evaluation criteria",
                            "Real-time feedback generation",
                        ].map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center text-gray-700"
                            >
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
