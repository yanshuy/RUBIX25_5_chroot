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
import { Calendar, Filter, MapPin } from "lucide-react";

export function Filters() {
    return (
        <div className="flex items-center gap-4 border-b px-12 py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="all">
                        <DropdownMenuRadioItem value="all">
                            All Locations
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="online">
                            Online
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="offline">
                            Offline
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="all">
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
                    <DropdownMenuRadioGroup value="all">
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
                    <DropdownMenuRadioGroup value="all">
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
