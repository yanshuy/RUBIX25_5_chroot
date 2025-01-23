import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Calendar, Clock } from "lucide-react";

export default function Timeline() {
    const timelineData = {
        timeline: [
            {
                date: "22 Jan",
                time: "00:00 AM",
                event: "Problem Statement Release",
            },
            {
                date: "22 Jan",
                time: "10:30 AM",
                event: "Inauguration Ceremony",
            },
            {
                date: "22 Jan",
                time: "11:00 AM",
                event: "Coding round begins",
            },
            {
                date: "23 Jan",
                time: "12:00 PM",
                event: "Mentoring session (Google Meet)",
            },
            {
                date: "24 Jan",
                time: "11:00 AM",
                event: "Coding round ends",
            },
            {
                date: "24 Jan",
                time: "12:00 PM",
                event: "Internal Judging Round (Google Meet)",
            },
            {
                date: "24 Jan",
                time: "7:00 PM",
                event: "Shortlisted teams Announcement",
            },
            {
                date: "25 Jan",
                time: "10:00 AM",
                event: "Final Judging Round (Seminar Hall)",
            },
            {
                date: "25 Jan",
                time: "3:00 PM",
                event: "Closing Ceremony",
            },
        ],
    };

    // Group events by date
    const groupedEvents = timelineData.timeline.reduce(
        (acc, event) => {
            if (!acc[event.date]) {
                acc[event.date] = [];
            }
            acc[event.date].push(event);
            return acc;
        },
        {} as Record<string, typeof timelineData.timeline>,
    );

    return (
        <div className="mx-auto h-[200vh] max-w-5xl px-4 py-8">
            <h1 className="mb-12 text-center text-3xl font-bold">
                Event Timeline
            </h1>

            <div className="relative -left-[40%]">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gray-200" />

                <div className="space-y-16">
                    {Object.entries(groupedEvents).map(
                        ([date, events], dateIndex) => (
                            <div key={date} className="relative">
                                {/* Date Header */}
                                <div className="mb-8 flex justify-center">
                                    <div className="flex items-center gap-2 rounded-full bg-[#14161f] px-4 py-2 text-white">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            {date}
                                        </span>
                                    </div>
                                </div>

                                {/* Events */}
                                <div className="space-y-8">
                                    {events.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="relative"
                                        >
                                            {/* Timeline Dot */}
                                            <div className="absolute left-1/2 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[#14161f]" />

                                            {/* Event Card */}
                                            <div
                                                className={`ml-auto w-[calc(50%-2rem)]`}
                                            >
                                                <div className="rounded-lg bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                                                    <div className="mb-2 flex items-center gap-2 text-gray-500">
                                                        <Clock className="h-4 w-4" />
                                                        <span className="text-sm">
                                                            {event.time}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {event.event}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
