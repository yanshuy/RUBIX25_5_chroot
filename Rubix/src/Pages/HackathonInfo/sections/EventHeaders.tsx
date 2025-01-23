import { Calendar, Heart, Instagram, Share2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import { TbSocial } from "react-icons/tb";

export function EventHeader({ data }) {
    console.log(data)
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex gap-4">
                <img
                    src={data?.profilePhoto}
                    alt="Event banner"
                    width={120}
                    height={80}
                    className="rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="mb-2 text-2xl font-semibold">
                        Hackathon: {data?.hackathonName}
                    </h1>
                    <p className="text-muted-foreground">
                        {data?.collegeName}, {data?.city}
                    </p>
                </div>
                <div className="flex items-start gap-2">
                    <p className="text-2xl font-semibold">Free</p>
                    <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Instagram className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Updated On:{" "}
                    {data
                        ? format(
                              new Date(data.applicationOpenDate),
                              "MMM d, yyyy",
                          )
                        : "not mentioned"}
                </div>
            </div>

            <div className="flex gap-2">
                {["No Restriction"].map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full border bg-background px-4 py-1 text-sm transition-colors hover:bg-muted"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
