import React from 'react';
import { ExternalLink, User, Calendar, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import HackathonPoster from '../../assets/hacksposter.png';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import axios from 'axios';

interface TeamMember {
  id: string;
  name: string;
  isAdmin?: boolean;
}

interface HackathonData {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  status: 'pending' | 'accepted' | 'rejected';
  teamMembers: TeamMember[];
}

const statusConfig = {
  pending: {
    label: 'Application under review',
    class: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  accepted: {
    label: 'Application Accepted',
    class: 'bg-green-100 text-green-800 border-green-300'
  },
  rejected: {
    label: 'Application Rejected',
    class: 'bg-red-100 text-red-800 border-red-300'
  }
};

const dummyData: HackathonData = {
  name: 'Mumbai Hacks 2025',
  startDate: '2025-02-10',
  endDate: '2025-02-12',
  venue: 'Mumbai Tech Center',
  status: 'pending',
  teamMembers: [
    { id: '1', name: 'Alice Johnson', isAdmin: true },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' }
  ]
};

export default function HackathonStatus() {
  const { data: hackathon, isLoading, isError } = useQuery<HackathonData>({
    queryKey: ['hackathon'],
    queryFn: async () => {
      const { data } = await axios.get('/api/hackathon/status');
      return data;
    }
  });

  const handleJoinServer = async () => {
    try {
      const { data } = await axios.post('/api/hackathon/join-server');
      window.location.href = data.inviteLink;
    } catch (error) {
      console.error('Failed to join server:', error);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // Use dummy data in case of error
  const hackathonData = isError ? dummyData : hackathon;

  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-2 grid-rows-10 gap-8">
        <Card className="overflow-hidden col-span-1 row-span-4">
          <img 
            src={HackathonPoster} 
            alt="Mumbai Hacks Banner" 
            className="w-full object-cover h-full"
          />
        </Card>

        <Card className='p-6 space-y-6 col-span-2 row-start-5 row-span-3'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">{hackathonData?.name}</h2>
              <ExternalLink className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <h3>Hackathon Starts</h3>
              </div>
              <p className="text-gray-900 font-medium">{hackathonData?.startDate}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <h3>Hackathon Ends</h3>
              </div>
              <p className="text-gray-900 font-medium">{hackathonData?.endDate}</p>
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <h3>Venue</h3>
              </div>
              <p className="text-gray-900">{hackathonData?.venue}</p>
            </div>
          </div>
        </Card>

        <Card className='h-full row-span-4'>
          <div className='p-6 space-y-6'>
            <h3 className="font-semibold text-lg">TEAM MEMBERS</h3>
            <div className="space-y-4">
              {hackathonData &&
              hackathonData?.teamMembers?.map((member) => (
                <div key={member.id} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{member.name}</span>
                  </div>
                  {member.isAdmin && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      Admin
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="row-span-1 flex items-center gap-4">
        <Badge 
            variant="outline" 
            className={`px-4 py-3 h-fit text-base ${
                statusConfig[hackathonData?.status]?.class || 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
            >
            {statusConfig[hackathonData?.status]?.label || 'Accepted'}
        </Badge>
          {hackathonData?.status === 'accepted' && (
            <Button 
              onClick={handleJoinServer}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Server
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
