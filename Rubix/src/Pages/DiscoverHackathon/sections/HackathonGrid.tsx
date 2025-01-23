import { HackathonCard } from "../../../components/HackathonCard";
import { Hackathon } from "../DiscoverHackathon";

export function HackathonGrid({ hackathons }: { hackathons: Hackathon[] }) {
    return (
        <div className="px-12 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hackathons?.map((hackathon) => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
            </div>
        </div>
    );
}
