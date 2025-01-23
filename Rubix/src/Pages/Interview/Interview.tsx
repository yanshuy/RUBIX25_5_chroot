import { useState } from "react";
import Guidelines from "./sections/Guidelines";

import { ToastProvider } from "@/components/ui/toast";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../App";
import InterviewSession from "./InterviewSession";
import Loader from "../../components/Loader";

async function getQuestions() {
    const at = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}/api/core/interview/questions/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${at}`,
            "ngrok-skip-browser-warning": "true",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function useQuestions() {
    return useQuery({
        queryFn: getQuestions,
        queryKey: ["question"],
        refetchOnWindowFocus: false,
    });
}

export default function Interview() {
    const [isStarted, setIsStarted] = useState(false);

    const { data: questions, isLoading } = useQuestions();
    console.log(questions);

    return (
        <div className="w-full">
            {!isStarted ? (
                <Guidelines onStart={() => setIsStarted(true)} />
            ) : isLoading ? (
                <Loader />
            ) : (
                <ToastProvider>
                    <InterviewSession questions={questions} />
                </ToastProvider>
            )}
        </div>
    );
}
