import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Instagram, Link2 } from "lucide-react";
import type { Hackathon } from "../Pages/DiscoverHackathon/DiscoverHackathon";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface HackathonCardProps {
    hackathon: Hackathon;
}

function startDate(string: string) {
    const date = Date.parse(string);
    return format(date, "d/M/yy");
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
    console.log(hackathon);
    return (
        <Link to={`/hackathon/${hackathon.id}/info`}>
            <Card className="group overflow-hidden">
                <CardHeader className="border-b p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <div>
                                <img src={} alt="LogoHackathon" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                {hackathon.hackathonName}
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            {hackathon.website && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <Link2 className="h-4 w-4" />
                                </Button>
                            )}
                            {hackathon.social_links && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-sm uppercase text-muted-foreground">
                                Theme
                            </div>
                            <Badge variant="secondary" className="rounded-full">
                                {hackathon.theme
                                    ? hackathon.theme
                                    : "No Restrictions"}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <Avatar
                                        key={i}
                                        className="border-2 border-background"
                                    >
                                        <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <span className="text-sm text-emerald-600">
                                +{(Math.random() * 100).toFixed(0)}{" "}
                                participating
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="flex gap-2">
                        <Badge variant="secondary">
                            Starts {startDate(hackathon.hackathonBeginDate)}
                        </Badge>
                    </div>
                    <Button>Apply now</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
