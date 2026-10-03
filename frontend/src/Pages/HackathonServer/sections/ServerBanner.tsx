import { Trophy, Users, Calendar, X } from "lucide-react";
import { useState } from "react";

export default function ServerBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-[#5865F2] text-white">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                HackVirtual 2024
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span className="text-sm">250+ Participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="text-sm">Feb 15-17, 2024</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="rounded p-1 hover:bg-white/10"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
