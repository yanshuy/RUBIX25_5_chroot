import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

// Function to generate a random letter from A-Z
function getRandomLetter(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Function to generate a random background color and its corresponding text color
function getRandomColor(): { bgColor: string; textColor: string } {
    const colors = [
        { bgColor: "bg-red-50", textColor: "text-red-800" },
        { bgColor: "bg-blue-50", textColor: "text-blue-800" },
        { bgColor: "bg-teal-50", textColor: "text-teal-800" },
        { bgColor: "bg-yellow-50", textColor: "text-yellow-800" },
        { bgColor: "bg-purple-50", textColor: "text-purple-800" },
        { bgColor: "bg-pink-50", textColor: "text-pink-800" },
        { bgColor: "bg-orange-50", textColor: "text-orange-800" },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
    return (
        <Card className="group overflow-hidden">
            <CardHeader className="border-b p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 ">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                                src={hackathon.profilePhoto}
                                alt="Logo"
                                className="h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">
                                {hackathon.hackathonName}
                            </h3>
                            <p className="text-sm">{hackathon.collegeName}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {hackathon.website && (
                            <Link to={hackathon.website}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Link2 className="h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                        {hackathon.social_links ? (
                            <Link to={hackathon.social_links}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Link to={"https://www.instagram.com/csi_tsec/"}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            </Link>
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
                            {hackathon.theme ? hackathon.theme : "No Restrictions"}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => {
                                const { bgColor, textColor } = getRandomColor();
                                return (
                                    <Avatar key={i}>
                                        <AvatarFallback className={`${bgColor} ${textColor} font-medium text-xl`}>
                                            {getRandomLetter()}
                                        </AvatarFallback>
                                    </Avatar>
                                );
                            })}
                        </div>
                        <span className="text-sm text-emerald-600 font-medium">
                            +{(Math.random() * 100).toFixed(0)} participating
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
                <Link to={`/hackathon/${hackathon.id}/info`}>
                    <Button>Apply now</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}