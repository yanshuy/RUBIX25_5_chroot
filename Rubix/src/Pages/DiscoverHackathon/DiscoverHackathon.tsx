import { Filters } from "./sections/Filters";
import { HackathonGrid } from "./sections/HackathonGrid";
import { HeroSection } from "./sections/HeroSection";
import { SiteHeader } from "./sections/SiteHeader";

export default function DiscoverHackathon() {
    return (
        <div className="min-h-screen">
            <SiteHeader />
            <main>
                <HeroSection />
                <Filters />
                <HackathonGrid />
            </main>
        </div>
    );
}
