import TeammateFinder from "./TeammateFinder";

export default function FindTeammates() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-center text-4xl font-bold">
                    Find Your Teammate
                </h1>
                <TeammateFinder />
            </main>
        </div>
    );
}
