import React from 'react';
import { ExternalLink, User, Calendar, MapPin } from 'lucide-react';
import HackathonPoster from '../../assets/hacksposter.png'
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface TeamMember {
  name: string;
  isAdmin?: boolean;
}

export default function HackathonStatus() {
  const teamMembers: TeamMember[] = [
    { name: 'Yanshuman Yadav' },
    { name: 'Vaibhav Sharma' },
    { name: 'Devansh Nair', isAdmin: true },
    { name: 'Vinayak Mohanty' }
  ];

  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-2 grid-rows-10 gap-8">
          <Card className="overflow-hidden col-span-1 row-span-4 space-y-6">
            <img 
              src={HackathonPoster} 
              alt="Mumbai Hacks Banner" 
              className="w-full object-cover h-full"
            />
          </Card>

          <Card className='p-6 space-y-6 col-span-2 row-start-5 row-span-3'>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">KnowCode 2.0</h2>
                <ExternalLink className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <h3>Hackathon Starts</h3>
                </div>
                <p className="text-gray-900 font-medium">January 24th, 2025</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <h3>Hackathon Ends</h3>
                </div>
                <p className="text-gray-900 font-medium">January 26th, 2025</p>
              </div>

              <div className="col-span-2 space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <h3>Venue</h3>
                </div>
                <p className="text-gray-900">
                  K. J. Somaiya Institute of Technology, Sion East, Sion, Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </Card>
        

        <Card className='h-full row-span-4'>
          <div className='p-6 space-y-6'>
            <h3 className="font-semibold text-lg">TEAM MEMBERS</h3>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between group hover:bg-gray-50 rounded-lg transition-colors">
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
        <Badge variant="outline" className="px-4 py-3 h-fit bg-yellow-100 text-yellow-800 border-yellow-300 row-span-1 w-fit text-base">
          Application under review
        </Badge>
      </div>
    </div>
  );
}