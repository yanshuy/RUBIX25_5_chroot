import { EventHeader } from "./sections/EventHeaders";
import { EventSidebar } from "./sections/EventSidebar";
import { EventTabs } from "./sections/EventTabs";
import { EventTimeline } from "./sections/EventTimeline";
import { PrizesSection } from "./sections/PrizeSection";
import { FAQSection } from "./sections/Faqs";
import { ContactSection } from "./sections/ContactSection";
import { baseUrl } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function getHackathonData(id: string) {
    const response = await fetch(`${baseUrl}/api/core/hackathons/${id}`, {
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

function useHackathonData(id: string) {
    return useQuery({
        queryFn: () => getHackathonData(id),
        queryKey: ["hackathon", id],
        refetchOnWindowFocus: false,
    });
}

export default function HackathonInfo() {
    const { id } = useParams();
    const { data } = useHackathonData(id ?? "1");
    console.log(data);
    return (
        <div className="scroll-smooth">
            <figure className="h-[60vh] w-full">
                <img
                    className="size-full object-cover"
                    src={data?.coverPhoto}
                    alt="hackathon banner"
                />
            </figure>
            <div className="min-h-screen bg-slate-100">
                <div className="mx-auto max-w-7xl bg-white">
                    <EventHeader data={data} />
                    <EventTabs />
                    <div className="flex">
                        <div className="grid flex-1 grid-cols-1 gap-6 border-r bg-slate-100 pr-4">
                            <section
                                id="timeline"
                                className="mt-6 rounded-lg bg-white"
                            >
                                <EventTimeline />
                            </section>
                            <section
                                id="contacts"
                                className="rounded-lg bg-white"
                            >
                                <ContactSection data={data} />
                            </section>
                            <section
                                id="prizes"
                                className="rounded-lg bg-white"
                            >
                                <PrizesSection data={data} />
                            </section>
                            <section id="faqs" className="rounded-lg bg-white">
                                <FAQSection />
                            </section>
                        </div>
                        <EventSidebar data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
