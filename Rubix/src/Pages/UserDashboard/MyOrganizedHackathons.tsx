import { useEffect, useState } from "react";
import { Plus, Search, CalendarDays, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { baseUrl } from "../../App";
import { useQuery } from "@tanstack/react-query";

type HackathonStatus = "live" | "draft" | "completed";

interface OrganizedHackathon {
  id: string;
  hackathonName: string;
  about: string;
  prizePool: number;
  status: HackathonStatus; // This will be dynamically determined
  registrationStatus: "open" | "closed";
  hackathonBeginDate: string;
  hackathonEndDate: string;
  totalParticipants: number;
  coverPhoto: string;
  profilePhoto: string;
}

async function getMyHackathons() {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/api/core/hackathons/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function useMyOrganizedHackathons() {
  return useQuery<OrganizedHackathon[]>({
    queryFn: getMyHackathons,
    queryKey: ["hackathons"],
    refetchOnWindowFocus: false,
  });
}

// Helper function to compute the status dynamically
function computeHackathonStatus(hackathon: OrganizedHackathon): HackathonStatus {
  if (hackathon.status === "draft") {
    return "draft"; // Draft hackathons remain drafts
  }

  // If registration is open, the hackathon is live
  if (hackathon.registrationStatus === "open") {
    return "live";
  }

  // If registration is closed, the hackathon is completed
  return "completed";
}

export default function MyOrganizedHackathons() {
  const { data: myhackathons, isLoading, isError } = useMyOrganizedHackathons();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | HackathonStatus>("all");

  // Filter hackathons based on search query and active filter
  const filteredHackathons = myhackathons
    ? myhackathons
        .filter((hackathon) => {
          const name = hackathon.hackathonName?.toLowerCase() || "";
          const description = hackathon.about?.toLowerCase() || "";
          const query = searchQuery.toLowerCase();
          return name.includes(query) || description.includes(query);
        })
        .filter((hackathon) => {
          const status = computeHackathonStatus(hackathon);
          return activeFilter === "all" ? true : status === activeFilter;
        })
    : [];

  if (isError) {
    return <div className="text-center py-12 text-red-500">Failed to load hackathons.</div>;
  }

  return (
    <div className="container p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Organized Hackathons</h1>
        <Link to={`/dashboard/organizehackathons/new`}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Organize a Hackathon
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} color="grey" />
            <Input
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <Tabs
            defaultValue="all"
            value={activeFilter}
            onValueChange={(value) => setActiveFilter(value as typeof activeFilter)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full sm:w-auto grid-cols-4 border-black shadow-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-slate-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map((hackathon) => (
              <Link to={`/organizerdashboard/team/${hackathon.id}`} key={hackathon.id}>
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No hackathons found</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface HackathonCardProps {
  hackathon: OrganizedHackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  // Compute the status dynamically
  const status = computeHackathonStatus(hackathon);

  const getStatusColor = (status: HackathonStatus | "unknown") => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800"; // Default styling for unknown status
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={hackathon.coverPhoto || "/placeholder.svg"}
          alt={hackathon.hackathonName}
          className="w-full h-full object-cover"
        />
        <Badge variant="secondary" className={`absolute top-4 right-4 ${getStatusColor(status)}`}>
          {status.toUpperCase()}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{hackathon.hackathonName}</h3>
        <p className="text-slate-600 line-clamp-2 mb-4">{hackathon.about}</p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(hackathon.hackathonBeginDate).toLocaleDateString()}</span>
          </div>
          {hackathon.totalParticipants && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{hackathon.totalParticipants} participants</span>
            </div>
          )}
        </div>
      </CardContent>
      {hackathon.prizePool && (
        <CardFooter className="px-6 py-4 bg-slate-50 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">₹{hackathon.prizePool} in prizes</span>
        </CardFooter>
      )}
    </Card>
  );
}