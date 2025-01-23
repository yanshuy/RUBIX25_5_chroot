import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Filter } from "lucide-react";
import { Hackathon } from "../DiscoverHackathon";

export function Filters({
    hackathons,
    setHackathons,
}: {
    hackathons: Hackathon[];
    setHackathons: React.Dispatch<
        React.SetStateAction<Hackathon[] | undefined>
    >;
}) {
    return (
        <div className="flex items-center gap-4 border-b px-12 py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                        value="all"
                        onValueChange={(value) => {
                            console.log(value);
                            setHackathons(() => {
                                return hackathons.filter(
                                    (hackathon) =>
                                        hackathon.start_date === value,
                                );
                            });
                        }}
                    >
                        <DropdownMenuRadioItem value="all">
                            All Time
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="today">
                            Today
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="week">
                            This Week
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="month">
                            This Month
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        More Filters
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value="all"
                        onValueChange={(val) => {
                            console.log(
                                val,
                                hackathons.filter((hackathon) => {
                                    if (val == "all") return true;
                                    if (hackathon.theme == undefined)
                                        return val === "no-restriction";
                                    return hackathon.theme === val;
                                }),
                            );
                            setHackathons(() => {
                                console.log(hackathons);
                                return hackathons.filter((hackathon) => {
                                    if (val === "all") return true;
                                    if (hackathon.theme == undefined)
                                        return val === "no-restriction";
                                    return hackathon.theme === val;
                                });
                            });
                        }}
                    >
                        <DropdownMenuRadioItem value="all">
                            All Themes
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="no-restriction">
                            No Restrictions
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="ai-ml">
                            AI/ML
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="blockchain">
                            Blockchain
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Registration</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value="all"
                        onValueChange={(value) => {
                            console.log(value);
                            setHackathons(() => {
                                return hackathons.filter(
                                    (hackathon) =>
                                        hackathon.registration_status === value,
                                );
                            });
                        }}
                    >
                        <DropdownMenuRadioItem value="all">
                            All Status
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="open">
                            Open
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="closed">
                            Closed
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
