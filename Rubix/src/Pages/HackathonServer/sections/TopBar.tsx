import { Search, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import type { Channel } from "../HackathonServer";
import SearchSuggestions from "./SearchSuggestions";

interface TopBarProps {
    activeChannel: Channel;
}

export default function TopBar({ activeChannel }: TopBarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex h-[3.8rem] items-center justify-between border-b bg-[white] px-4">
            <div className="max-w-xl flex-1">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        placeholder="Search channels, teams, or messages..."
                        className="border-0 bg-slate-200 p-2 pl-8"
                        onFocus={() => setIsSearchOpen(true)}
                        onBlur={() =>
                            setTimeout(() => setIsSearchOpen(false), 200)
                        }
                    />
                    <SearchSuggestions
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                        #{activeChannel.name}
                    </span>
                    <span className="mx-2">-</span>
                    <span>{activeChannel.description}</span>
                </div>
                <button className="text-muted-foreground hover:text-primary">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground hover:text-primary">
                    <Settings className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
