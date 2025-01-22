import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Hackathon } from "../DiscoverHackathon";

export function HeroSection({
    hackathons,
    setHackathons,
}: {
    hackathons: Hackathon[];
    setHackathons: React.Dispatch<
        React.SetStateAction<Hackathon[] | undefined>
    >;
}) {
    return (
        <section className="border-b bg-gradient-to-b from-background to-muted/50">
            <div className="space-y-8 px-12 py-16">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Discover Amazing Hackathons
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Find and participate in the best hackathons from around
                        the world. Connect with fellow developers and build
                        something awesome.
                    </p>
                </div>
                <div className="flex max-w-xl gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search hackathons..."
                            className="pl-9"
                            onChange={(e) => {
                                const searchQuery =
                                    e.target.value.toLowerCase();
                                setHackathons(() =>
                                    hackathons.filter((hackathon) =>
                                        hackathon.name
                                            .toLowerCase()
                                            .includes(searchQuery),
                                    ),
                                );
                            }}
                        />
                    </div>
                    <Button>Search</Button>
                </div>
            </div>
        </section>
    );
}
