import { Calendar, Heart, Share2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function EventHeader({ data }) {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex gap-4">
                <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/677756597a0f5_hackathon-technotronics.webp?d=1920x557"
                    alt="Event banner"
                    width={120}
                    height={80}
                    className="rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="mb-2 text-2xl font-semibold">
                        Hackathon: {data?.hackathonName}
                    </h1>
                    <p className="text-muted-foreground">{data?.city}</p>
                </div>
                <div className="flex items-start gap-2">
                    <p className="text-2xl font-semibold">Free</p>
                    <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Calendar className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    Online
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Updated On: Jan 21, 2025
                </div>
            </div>

            <div className="flex gap-2">
                {["Hackathon", "College Festival", "Coding Challenge"].map(
                    (tag) => (
                        <span
                            key={tag}
                            className="rounded-full border bg-background px-4 py-1 text-sm transition-colors hover:bg-muted"
                        >
                            {tag}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
