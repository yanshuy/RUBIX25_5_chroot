import { Calendar, MapPin, Users, Award } from "lucide-react";

export default function Details() {
    return (
        <div className="mx-auto max-w-3xl p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Hackathon Details
            </h2>
            <div className="space-y-6">
                <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-gray-700">Date</h3>
                        <p className="text-gray-600">August 15-17, 2023</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-gray-700">
                            Location
                        </h3>
                        <p className="text-gray-600">
                            Tech Hub Convention Center, Silicon Valley
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Users className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-gray-700">
                            Team Size
                        </h3>
                        <p className="text-gray-600">2-4 members per team</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Award className="mr-3 h-6 w-6 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-gray-700">Prizes</h3>
                        <p className="text-gray-600">
                            1st Place: $10,000, 2nd Place: $5,000, 3rd Place:
                            $2,500
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
