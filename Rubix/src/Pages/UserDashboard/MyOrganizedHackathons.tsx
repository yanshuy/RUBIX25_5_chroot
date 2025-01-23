import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users, Trophy } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

type HackathonStatus = "live" | "draft" | "completed" | "cancelled"

interface OrganizedHackathon {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: HackathonStatus
  participants?: number
  coverImage?: string
  prizePools?: string
}


// Sample data - replace with API call
const sampleHackathons: OrganizedHackathon[] = [
  {
    id: "1",
    title: "TechCrunch Hackathon 2024",
    description: "Join us for 48 hours of innovation and creativity. Build the next big thing in tech!",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    status: "live",
    participants: 250,
    prizePools: "$50,000 in prizes",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "AI Innovation Challenge",
    description: "Draft your ideas for the future of artificial intelligence.",
    startDate: "2024-04-01",
    endDate: "2024-04-03",
    status: "draft",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Blockchain Summit Hackathon",
    description: "Create decentralized solutions for real-world problems.",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    status: "completed",
    participants: 180,
    prizePools: "10 ETH + $20,000",
    coverImage: "/placeholder.svg?height=400&width=600",
  },
]

export default function MyOrganizedHackathons() {
  const [hackathons, setHackathons] = useState<OrganizedHackathon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | HackathonStatus>("all")

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setHackathons(sampleHackathons)
      } catch (error) {
        console.error("Failed to fetch hackathons:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHackathons()
  }, [])

  const filteredHackathons = hackathons
    .filter(
      (hackathon) =>
        hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((hackathon) => (activeFilter === "all" ? true : hackathon.status === activeFilter))

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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2"  size={20} color="grey" />
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-slate-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No hackathons found</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface HackathonCardProps {
  hackathon: OrganizedHackathon
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const getStatusColor = (status: OrganizedHackathon["status"]) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={hackathon.coverImage || "/placeholder.svg"}
          alt={hackathon.title}
          className="w-full h-full object-cover"
        />
        <Badge variant="secondary" className={`absolute top-4 right-4 ${getStatusColor(hackathon.status)}`}>
          {hackathon.status.toUpperCase()}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{hackathon.title}</h3>
        <p className="text-slate-600 line-clamp-2 mb-4">{hackathon.description}</p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
          </div>
          {hackathon.participants && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{hackathon.participants} participants</span>
            </div>
          )}
        </div>
      </CardContent>
      {hackathon.prizePools && (
        <CardFooter className="px-6 py-4 bg-slate-50 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">{hackathon.prizePools}</span>
        </CardFooter>
      )}
    </Card>
  )
}

