import { useState, useMemo } from "react";
import { leaderboardData } from "../Pages/LeaderBoard/leaderboardData";

export function useLeaderboardData() {
    const [searchTerm, setSearchTerm] = useState("");

    const sortedAndFilteredData = useMemo(() => {
        return leaderboardData
            .sort((a, b) => b.wins - a.wins || b.hackCoins - a.hackCoins)
            .filter(
                (entry) =>
                    entry.teamName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    entry.projectName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
    }, [searchTerm]);

    return {
        leaderboardData: sortedAndFilteredData,
        searchTerm,
        setSearchTerm,
    };
}
