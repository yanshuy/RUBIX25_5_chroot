import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function TeamHeader({
    activeTab,
    setActiveTab,
    onUploadDetails,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onUploadDetails: () => void;
}) {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <div className="border-b bg-white">
            <div className="py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={()=>navigate(-1)}>
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
                    <button
                        className="mr-16 rounded-md bg-slate-800 px-3 py-2 font-semibold text-white"
                        onClick={() => {
                            console.log("Update Details");
                            onUploadDetails();
                            navigate(`/hackathon/${params.id}/info`);
                        }}
                    >
                        Update Details
                    </button>
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
