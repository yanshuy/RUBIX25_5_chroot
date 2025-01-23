import { useState, useEffect, useRef } from "react";
import { Clock, Video, VideoOff, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "../../hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import QuestionReader from "./sections/QuestionReader";
import { baseUrl } from "../../App";

interface Response {
    question: string;
    answer: string;
}

const MockInterviewer = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [stream, setStream] = useState(null);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [responses, setResponses] = useState<Response[]>([]);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const { toast } = useToast();

    const questions = [
        {
            id: 1,
            text: "Tell me about a challenging project you've worked on and how you handled it.",
            category: "behavioral",
        },
        {
            id: 2,
            text: "What are your greatest strengths and how do they align with this role?",
            category: "behavioral",
        },
        {
            id: 3,
            text: "Where do you see yourself in five years?",
            category: "behavioral",
        },
        {
            id: 4,
            text: "Describe a situation where you had to work with a difficult team member. How did you handle it?",
            category: "behavioral",
        },
        {
            id: 5,
            text: "What's the most innovative idea you've implemented in your previous role?",
            category: "behavioral",
        },
    ];

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) =>
                console.error("Error accessing media devices:", err),
            );

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((time) => time - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording, timeRemaining]);

    const startRecording = () => {
        if (!stream) return;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
                type: "audio/wav",
            });
            const currentQuestion = questions[currentQuestionIndex];
            setResponses((prevResponses) => {
                return [
                    ...prevResponses,
                    {
                        question: currentQuestion.text,
                        answer: URL.createObjectURL(audioBlob),
                    },
                ];
            });
            console.log("Recording stopped, audio blob created:", audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
        toast({
            title: "Recording started",
            description: "Your answer is now being recorded.",
        });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setTimeRemaining(120);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setIsCompleted(true);
            }

            toast({
                title: "Recording stopped",
                description: "Your answer has been saved.",
            });
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const sendAudioToBackend = async () => {
        const formData = new FormData();

        // Use for...of instead of forEach to handle async/await properly
        for (const [index, response] of responses.entries()) {
            try {
                const audioBlob = await fetch(response.answer).then((r) =>
                    r.blob(),
                );
                formData.append(
                    `audioResponse${index + 1}`,
                    audioBlob,
                    `audio${index + 1}.webm`,
                );
                formData.append(`question${index + 1}`, response.question);
            } catch (error) {
                console.error(`Error processing response ${index + 1}:`, error);
                toast({
                    title: "Processing Error",
                    description: `Failed to process question ${index + 1}`,
                    variant: "destructive",
                });
                return;
            }
        }

        try {
            const response = await fetch(
                `${baseUrl}/api/core/interview/questions/`,
                {
                    method: "POST",
                    body: formData, // No Content-Type header! Let browser set it
                },
            );

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();
            toast({
                title: "Interview Submitted",
                description: "Your answers have been successfully processed.",
                variant: "success",
            });
            return result;
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Submission Failed",
                description: "There was a problem submitting your interview.",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="flex h-screen flex-col bg-slate-200 p-6">
            <div className="flex h-full gap-6">
                <div className="flex w-2/3 flex-col gap-4">
                    <Card className="size-full flex-1 overflow-hidden">
                        <CardContent className="size-full p-4">
                            <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                                <video
                                    id="interview-video"
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                                {isVideoOff && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                        <Avatar className="h-32 w-32">
                                            <AvatarImage
                                                src="/placeholder-avatar.jpg"
                                                alt="Interviewee"
                                            />
                                            <AvatarFallback>IN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleVideo}
                                    >
                                        {isVideoOff ? (
                                            <VideoOff className="h-4 w-4" />
                                        ) : (
                                            <Video className="h-4 w-4" />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {isVideoOff
                                            ? "Turn on camera"
                                            : "Turn off camera"}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Button
                            className="flex-1"
                            variant={isRecording ? "destructive" : "default"}
                            onClick={
                                isRecording ? stopRecording : startRecording
                            }
                        >
                            {isRecording ? "Stop Recording" : "Start Recording"}
                        </Button>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-800" />
                            <span className="font-mono text-lg">
                                {Math.floor(timeRemaining / 60)}:
                                {(timeRemaining % 60)
                                    .toString()
                                    .padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-1/3">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-slate-800">
                                Interview Questions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={`question${currentQuestionIndex + 1}`}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-5">
                                    {questions.map((_, index) => (
                                        <TabsTrigger
                                            key={index}
                                            value={`question${index + 1}`}
                                            disabled={
                                                index !== currentQuestionIndex
                                            }
                                        >
                                            Q{index + 1}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {questions.map((question, index) => (
                                    <TabsContent
                                        key={index}
                                        value={`question${index + 1}`}
                                        className="mt-4"
                                    >
                                        <Card>
                                            <CardContent className="pt-4">
                                                <p className="mb-4 text-lg font-medium">
                                                    {question.text}
                                                </p>
                                                <QuestionReader
                                                    text={question.text}
                                                />
                                                <Progress
                                                    value={
                                                        (timeRemaining / 120) *
                                                        100
                                                    }
                                                    className="mt-4"
                                                />
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
                {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <Card className="w-96">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl font-bold text-slate-800">
                                    Interview Completed!
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 text-center">
                                    Congratulations on completing your
                                    interview!
                                </p>
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-950"
                                    onClick={sendAudioToBackend}
                                >
                                    <Send className="mr-2 h-4 w-4" /> Submit
                                    Answers
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MockInterviewer;
