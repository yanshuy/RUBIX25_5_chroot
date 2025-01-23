"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { baseUrl } from "../../App"
import { TbBrandBandcamp } from "react-icons/tb"
import { Link } from "react-router-dom"

interface Hackathon {
  id: string
  name: string
  status: "PROFILE_NOT_SUBMITTED" | "TEAM_UNDER_REVIEW" | "PROJECT_SUBMITTED" | "NOT_ACCEPTED" | "ACCEPTED"
  description?: string
  applicationDeadline?: string
}

interface FeaturedHackathon extends Hackathon {
  description: string
  applicationDeadline: string
}

interface StatusBadgeProps {
  status: Hackathon["status"]
}

const staticHackathons: Hackathon[] = [
  {
    id: "1",
    name: "ETHDenver 2025",
    status: "PROFILE_NOT_SUBMITTED",
  },
  {
    id: "2",
    name: "KnowCode 2.0",
    status: "TEAM_UNDER_REVIEW",
  },
  {
    id: "3",
    name: "Err_404 6.0",
    status: "TEAM_UNDER_REVIEW",
  },
  {
    id: "4",
    name: "MumbaiHacks",
    status: "PROJECT_SUBMITTED",
  },
  {
    id: "5",
    name: "Codeissance 2024",
    status: "NOT_ACCEPTED",
  },
  {
    id: "6",
    name: "Need_For_Code_3.0",
    status: "ACCEPTED",
  },
]

const featuredHackathon: FeaturedHackathon = {
  id: "1",
  name: "ETHDenver 2025",
  status: "PROFILE_NOT_SUBMITTED",
  description: "Largest and Longest Running #BUILDathon in the World",
  applicationDeadline: "24th February, 2025",
}

export default function UserHackathons() {
  const [hackathons, setHackathons] = useState<Hackathon[]>(staticHackathons)
  const [loading, setLoading] = useState(true)

  function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusConfig = (status: Hackathon["status"]) => {
      switch (status) {
        case "PROFILE_NOT_SUBMITTED":
          return {
            label: "PROFILE NOT SUBMITTED FOR REVIEW",
            className: "bg-orange-500 text-white",
          }
        case "TEAM_UNDER_REVIEW":
          return {
            label: "TEAM UNDER REVIEW",
            className: "bg-yellow-400 text-black",
          }
        case "PROJECT_SUBMITTED":
          return {
            label: "PROJECT SUBMITTED",
            className: "bg-emerald-500 text-white",
          }
        case "NOT_ACCEPTED":
          return {
            label: "NOT ACCEPTED",
            className: "bg-gray-600 text-white",
          }
        case "ACCEPTED":
          return {
            label: "ACCEPTED",
            className: "bg-[#D4B982] text-black",
          }
      }
    }
  
    const config = getStatusConfig(status)
  
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>{config.label}</span>
  }

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/hackathons`)
        if (!response.ok) throw new Error("Failed to fetch hackathons")
        const data = await response.json()
        setHackathons(data)
      } catch (error) {
        console.error("Error fetching hackathons:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHackathons()
  }, [])

  return (
    <div className="container p-6 space-y-8">
      <div className="flex gap-4 w-full max-w-6xl p-4">
        <HackathonCard 
          title = {"ETHDenver 2025"}
          description = {"Largest and Longest Running #BUILDathon in the World"}
          applicationDeadline = {"Applications close 24th February, 2025"}
        />
        <Link to={"/discover"}>
          <div className="relative w-80 h-[280px] rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 320 280" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient 
                  id="cardGradient" 
                  x1="0%" 
                  y1="0%" 
                  x2="100%" 
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <clipPath id="cardClip">
                  <path d="M0 16C0 7.16344 7.16344 0 16 0H304C312.837 0 320 7.16344 320 16V280H0V16Z" />
                </clipPath>
              </defs>
              
              <rect 
                width="320" 
                height="280" 
                fill="url(#cardGradient)" 
                clipPath="url(#cardClip)" 
              />
              
              <path 
                className="transition-transform duration-700 group-hover:translate-x-6"
                d="M-40 80C40 50 120 110 200 80C280 50 360 90 440 80V0H-40V80Z" 
                fill="#22c55e" 
                fillOpacity="0.2"
              />
              <path 
                className="transition-transform duration-500 group-hover:translate-x-4"
                d="M-40 60C40 30 120 90 200 60C280 30 360 70 440 60V0H-40V60Z" 
                fill="white" 
                fillOpacity="0.1"
              />
            </svg>

            <div className="relative h-full flex flex-col items-center justify-center p-6">
              <div className="w-14 h-14 outline outline-white outline-4 rounded-full shadow-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-12">
                <TbBrandBandcamp color="white" size={37}/>
              </div>
              
              <div className="text-center transition-transform duration-300 group-hover:scale-1">
                <h3 className="text-3xl font-bold text-white mb-1 tracking-wide">
                  Explore
                </h3>
                <p className="text-xl text-white/90 font-medium">
                  Hackathons
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Hackathons List */}
      <div className="px-4">
        <h1 className="text-2xl font-semibold mb-6">Your hackathons</h1>

        <div className="bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-12 gap-4 p-4 text-sm text-gray-500">
            <div className="col-span-1">#</div>
            <div className="col-span-7">Hackathon</div>
            <div className="col-span-4">Status</div>
          </div>
        </div>

        <div className="divide-y border rounded-b-lg bg-white">
          {hackathons.map((hackathon, index) => (
            <Link to={`/dashboard/hackathons/${hackathon.name}`} key={hackathon.id} className="block">
              <div
              key={hackathon.id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
            >
              <div className="col-span-1 text-gray-500">{index + 1}.</div>
              <div className="col-span-7 font-medium">{hackathon.name}</div>
              <div className="col-span-3">
                <StatusBadge status={hackathon.status} />
              </div>
              <div className="col-span-1 flex justify-end">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

interface HackathonCardProps {
  title: string;
  description: string;
  applicationDeadline: string;
}

const HackathonCard = ({
  title = "ETHDenver 2025",
  description = "Largest and Longest Running #BUILDathon in the World",
  applicationDeadline = "Applications close 24th February, 2025",
}: HackathonCardProps) => {
  return (
      <Card className="flex-1 bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <ExternalLink className="w-5 h-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-2">
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-700 mt-4">{applicationDeadline}</p>
        </CardContent>
        <CardFooter className="p-0 mt-4">
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Go to dashboard
          </Button>
        </CardFooter>
      </Card>
  );
};