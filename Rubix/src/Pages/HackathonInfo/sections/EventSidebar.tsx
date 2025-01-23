import { Users, Eye, Calendar } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

export function EventSidebar({ data }) {
    const navigate = useNavigate();
    return (
        <div className="w-80 space-y-6 p-6">
            <Button
                className="w-full"
                size="lg"
                onClick={() => navigate("/hackathon/1/register")}
            >
                Register
            </Button>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Registered
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{data?.totalParticipants} / 1500</span>
                            <span className="text-blue-600">
                                (Limited Slots)
                            </span>
                        </div>
                        <Progress
                            value={(data?.totalParticipants / 1500) * 100}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Team Size
                        </div>
                    </div>
                    <div className="font-medium">
                        {data?.minMembers}
                        {data?.maxMembers > data?.minMembers
                            ? `- ${data?.maxMembers}`
                            : " "}
                        Members
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Eye className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Impressions
                        </div>
                    </div>
                    <div className="font-medium">
                        {(Math.random() * 10000).toFixed(0)}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Calendar className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Registration Deadline
                        </div>
                    </div>
                    <div className="font-medium">
                        {data
                            ? foramtDate(data.applicationCloseDate)
                            : "not mentioned"}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Eligibility</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Engineering Students</li>
                        <li>Postgraduate</li>
                        <li>Undergraduate</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Refer & Win</h3>
                    <p className="text-sm text-muted-foreground">
                        MacBook, iPhone, Apple Watch
                    </p>
                </div>
            </div>
        </div>
    );
}

export function foramtDate(string: string) {
    const date = new Date(string);
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "dd MMM yy, hh:mm a");
}
