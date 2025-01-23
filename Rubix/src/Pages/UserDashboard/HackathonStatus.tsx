import React from 'react';
import { ExternalLink, User, Calendar, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import HackathonPoster from '../../assets/hacksposter.png';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../App';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface HackathonData {
  id: number;
  hackathonName: string;
  about: string;
  prizePool: number;
  city: string;
  collegeName: string;
  minMembers: number;
  maxMembers: number;
  totalParticipants: number;
  hackathonWebsite: string;
  applicationOpenDate: string;
  applicationCloseDate: string;
  hackathonBeginDate: string;
  hackathonEndDate: string;
  theme: string | null;
  website: string;
  social_links: string | null;
  profilePhoto: string;
  coverPhoto: string;
  members: TeamMember[];
  participationStatus: string;
  registrationStatus: string;
}

const statusConfig = {
  pending: {
    label: 'Application under review',
    class: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  shortlisted: {
    label: 'Application Shortlisted',
    class: 'bg-green-100 text-green-800 border-green-300'
  },
  rejected: {
    label: 'Application Rejected',
    class: 'bg-red-100 text-red-800 border-red-300'
  },
};

// Function to format ISO date to a readable format
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export default function HackathonStatus() {
  const { id } = useParams<{ id: string }>();
  const accessToken = localStorage.getItem("accessToken");

  const { data: hackathons, isLoading, isError } = useQuery<HackathonData[]>({
    queryKey: ['hackathons'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/core/hackathons/participated/`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  // Find the hackathon that matches the id from the URL
  const hackathon = hackathons?.find((h) => h.id === Number(id));

  const handleJoinServer = async () => {
    try {
      const response = await fetch('/api/hackathon/join-server', {
        method: 'POST',
      });
      const data = await response.json();
      window.location.href = data.inviteLink;
    } catch (error) {
      console.error('Failed to join server:', error);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (isError) {
    return <div className="p-8">Error fetching hackathon data</div>;
  }

  if (!hackathon) {
    return <div className="p-8">Hackathon not found</div>;
  }

  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-2 grid-rows-10 gap-8">
        <Card className="overflow-hidden col-span-1 row-span-4">
          <img 
            src={hackathon?.coverPhoto || HackathonPoster} 
            alt="Hackathon Banner" 
            className="w-full object-cover h-full"
          />
        </Card>

        <Card className='p-6 space-y-6 col-span-2 row-start-5 row-span-3'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">{hackathon?.hackathonName}</h2>
              <a href={hackathon?.hackathonWebsite} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <h3>Hackathon Starts</h3>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(hackathon?.hackathonBeginDate)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <h3>Hackathon Ends</h3>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(hackathon?.hackathonEndDate)}
              </p>
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <h3>Venue</h3>
              </div>
              <p className="text-gray-900">{hackathon?.city}, {hackathon?.collegeName}</p>
            </div>
          </div>
        </Card>

        <Card className='h-full row-span-4'>
          <div className='p-6 space-y-6'>
            <h3 className="font-semibold text-lg">TEAM MEMBERS</h3>
            <div className="space-y-4">
              {hackathon?.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{member.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="row-span-1 flex items-center gap-4">
          <Badge 
            variant="outline" 
            className={`px-4 py-3 h-fit text-base ${
              statusConfig[hackathon?.participationStatus]?.class || 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            {statusConfig[hackathon?.participationStatus]?.label || 'Unknown Status'}
          </Badge>
          {hackathon?.participationStatus === 'shortlisted' && (
            <>
            <Link to={`/hackathon/${id}/server`}>
              <Button 
                onClick={handleJoinServer}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join Server
              </Button>
            </Link>
            <Button 
              onClick={handleJoinServer}
              disabled={Date.now() > new Date(hackathon?.applicationCloseDate).getTime()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Project
            </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}