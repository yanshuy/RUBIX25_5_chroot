import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function TeamHeader({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}) {
    return (
        <div className="border-b bg-white">
            <div className="py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                24 Hours Hackathon
                            </h1>
                            <p className="text-muted-foreground">
                                Woxsen University, Hyderabad
                            </p>
                        </div>
                    </div>
                    <Button className="mr-16">Update Details</Button>
                </div>
            </div>

            <div className="flex divide-x border-t bg-slate-100">
                <button
                    className={`${activeTab == "LDetails" ? "bg-white" : ""} basis-full py-2`}
                    onClick={() => setActiveTab("LDetails")}
                >
                    Leader Details
                </button>
                <button
                    className={`${activeTab == "TDetails" ? "bg-white" : ""} basis-full py-2`}
                    onClick={() => setActiveTab("TDetails")}
                >
                    Team Details
                </button>
            </div>
        </div>
    );
}
