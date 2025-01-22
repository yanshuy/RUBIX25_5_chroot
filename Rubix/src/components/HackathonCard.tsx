import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Facebook, Instagram, Link2, Twitter } from "lucide-react";
import type { Hackathon } from "../Pages/DiscoverHackathon/sections/HackathonGrid";

interface HackathonCardProps {
    hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
    return (
        <Card className="group overflow-hidden">
            <CardHeader className="border-b p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {hackathon.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {hackathon.type}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {hackathon.socialLinks.website && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Link2 className="h-4 w-4" />
                            </Button>
                        )}
                        {hackathon.socialLinks.instagram && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Instagram className="h-4 w-4" />
                            </Button>
                        )}
                        {hackathon.socialLinks.twitter && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Twitter className="h-4 w-4" />
                            </Button>
                        )}
                        {hackathon.socialLinks.facebook && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Facebook className="h-4 w-4" />
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
                            {hackathon.theme}
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
                            +{hackathon.participantsCount} participating
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="flex gap-2">
                    <Badge variant="secondary">{hackathon.status}</Badge>
                    <Badge variant="secondary">
                        {hackathon.registrationStatus}
                    </Badge>
                    <Badge variant="secondary">
                        Starts {hackathon.startDate}
                    </Badge>
                </div>
                <Button>Apply now</Button>
            </CardFooter>
        </Card>
    );
}
