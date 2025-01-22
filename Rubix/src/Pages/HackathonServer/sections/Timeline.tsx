import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const timelineEvents = [
    {
        time: "9:00 AM",
        event: "Opening Ceremony",
        description: "Welcome address and event kickoff",
    },
    {
        time: "10:00 AM",
        event: "Team Formation",
        description: "Form teams and brainstorm ideas",
    },
    {
        time: "12:00 PM",
        event: "Lunch Break",
        description: "Networking and refueling",
    },
    {
        time: "1:00 PM",
        event: "Hacking Begins",
        description: "Start working on your projects",
    },
    {
        time: "6:00 PM",
        event: "Dinner",
        description: "Take a break and enjoy some food",
    },
    {
        time: "9:00 PM",
        event: "Midnight Snack",
        description: "Late-night energy boost",
    },
    {
        time: "8:00 AM",
        event: "Breakfast",
        description: "Start your day with a healthy meal",
    },
    {
        time: "12:00 PM",
        event: "Lunch",
        description: "Midday break and networking",
    },
    {
        time: "3:00 PM",
        event: "Project Submission",
        description: "Submit your projects for judging",
    },
    {
        time: "4:00 PM",
        event: "Presentations",
        description: "Teams present their projects",
    },
    {
        time: "6:00 PM",
        event: "Judging",
        description: "Judges evaluate the projects",
    },
    {
        time: "7:00 PM",
        event: "Closing Ceremony",
        description: "Winners announced and prizes awarded",
    },
];

export default function Timeline() {
    const [currentDay, setCurrentDay] = useState(1);
    const totalDays = 2;

    const handlePrevDay = () => {
        setCurrentDay((prev) => Math.max(prev - 1, 1));
    };

    const handleNextDay = () => {
        setCurrentDay((prev) => Math.min(prev + 1, totalDays));
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Hackathon Timeline
            </h2>
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handlePrevDay}
                    disabled={currentDay === 1}
                    className="rounded-full bg-blue-100 p-2 text-blue-600 disabled:opacity-50"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h3 className="text-xl font-semibold text-gray-700">
                    Day {currentDay}
                </h3>
                <button
                    onClick={handleNextDay}
                    disabled={currentDay === totalDays}
                    className="rounded-full bg-blue-100 p-2 text-blue-600 disabled:opacity-50"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
            <div className="space-y-6">
                {timelineEvents
                    .slice((currentDay - 1) * 6, currentDay * 6)
                    .map((event, index) => (
                        <div key={index} className="flex items-start">
                            <div className="mr-4 w-16 flex-shrink-0 text-right">
                                <span className="text-sm font-semibold text-gray-600">
                                    {event.time}
                                </span>
                            </div>
                            <div className="relative flex-grow border-l-2 border-blue-300 pb-6 pl-4">
                                <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
                                <h4 className="mb-1 text-lg font-semibold text-gray-800">
                                    {event.event}
                                </h4>
                                <p className="text-gray-600">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
