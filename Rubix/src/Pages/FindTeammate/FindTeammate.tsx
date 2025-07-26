import { baseUrl } from "../../App";
import Navbar from "../../components/Navbar";
import TeammateFinder from "./TeammateFinder";

export default function FindTeammates() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
            <Navbar />
            <main className="container mx-auto px-12 py-28">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Find Your Teammate</h1>
                    <a href={`${baseUrl}/api/core/home/`}>
                        <button className="focus:shadow-outline rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                            Try Intelligent Matching
                        </button>
                    </a>
                </div>
                <TeammateFinder />
            </main>
        </div>
    );
}
