import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Video, VideoOff, Send, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useTeamData } from "../HackathonServer/HackathonServer";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../App";

interface Question {
    id: number;
    text: string;
    category: string;
}

interface InterviewSessionProps {
    questions: Question[];
}

export default function InterviewSession({ questions }: InterviewSessionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [responses, setResponses] = useState<
        { question: string; answer: string }[]
    >([]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const { toast } = useToast();
    const params = useParams();
    const { data } = useTeamData(params.id ?? "1");
    const navigate = useNavigate();

    // Initialize video stream
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                toast({
                    title: "Camera Error",
                    description: "Unable to access camera or microphone",
                    variant: "destructive",
                });
            });

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (
                    videoRef.current.srcObject as MediaStream
                ).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    // Timer management
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording, timeRemaining]);

    useEffect(() => {
        if (questions.length > 0) {
            speakQuestion(questions[currentQuestionIndex].text);
        }
    }, [currentQuestionIndex]);

    // Speech recognition setup and handlers
    const startRecording = () => {
        console.log("Starting recording...");
        if (
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window
        ) {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let interimTranscript = "";
                let finalTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + " ";
                    } else {
                        interimTranscript += transcript;
                    }
                }

                setTranscript(finalTranscript + interimTranscript);
            };

            recognitionRef.current.start();
            setIsRecording(true);
            toast({
                title: "Recording Started",
                description: "Speak clearly into your microphone",
            });
        } else {
            toast({
                title: "Not Supported",
                description:
                    "Speech recognition is not supported in this browser",
                variant: "destructive",
            });
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);

            // Save the response
            setResponses((prev) => [
                ...prev,
                {
                    question: questions[currentQuestionIndex].text,
                    answer: transcript,
                },
            ]);

            // Move to next question or complete
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
                setTimeRemaining(120);
                setTranscript("");
            } else {
                setIsCompleted(true);
            }
        }
    };

    const toggleVideo = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    const speakQuestion = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const submitInterview = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/core/interview/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ responses, team_id: data?.teamId }),
            });

            if (!response.ok) throw new Error("Failed to submit interview");
            if (response.ok) localStorage.setItem("interview", "true");
            toast({
                title: "Interview Submitted",
                description: "Your responses have been saved successfully",
            });
        } catch (error) {
            toast({
                title: "Submission Error",
                description: "Failed to submit interview responses",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="grid h-[calc(100vh-4rem)] gap-4 p-4 md:grid-cols-[1fr_700px]">
            {/* Video Feed */}
            <div className="flex flex-col gap-4">
                <Card className="flex-1">
                    <CardContent className="p-4">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="h-full w-full object-cover"
                            />
                            {!isVideoEnabled && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                    <Avatar className="h-32 w-32">
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Transcript Display */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Your Answer
                            {isRecording && (
                                <Badge
                                    variant="destructive"
                                    className="animate-pulse"
                                >
                                    Recording
                                </Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea>
                            <div className="h-[100px] overflow-y-auto rounded-lg bg-muted p-4">
                                {transcript ||
                                    "Your answer will appear here as you speak..."}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={toggleVideo}>
                        {isVideoEnabled ? (
                            <Video className="h-4 w-4" />
                        ) : (
                            <VideoOff className="h-4 w-4" />
                        )}
                    </Button>
                    <Button
                        className="flex-1"
                        variant={isRecording ? "destructive" : "default"}
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? (
                            <>
                                <MicOff className="mr-2 h-4 w-4" /> Stop
                                Recording
                            </>
                        ) : (
                            <>
                                <Mic className="mr-2 h-4 w-4" /> Start Recording
                            </>
                        )}
                    </Button>
                    <div className="font-mono">
                        {Math.floor(timeRemaining / 60)}:
                        {(timeRemaining % 60).toString().padStart(2, "0")}
                    </div>
                </div>
            </div>

            {/* Question Panel */}
            <Card>
                <CardHeader>
                    <CardTitle>Interview Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs
                        value={`q${currentQuestionIndex + 1}`}
                        className="w-full"
                    >
                        <TabsList
                            className="grid w-full"
                            style={{
                                gridTemplateColumns: `repeat(${questions.length}, 1fr)`,
                            }}
                        >
                            {questions.map((_, i) => (
                                <TabsTrigger
                                    key={i}
                                    value={`q${i + 1}`}
                                    disabled={i !== currentQuestionIndex}
                                >
                                    Q{i + 1}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {questions.map((question, i) => (
                            <TabsContent key={i} value={`q${i + 1}`}>
                                <Card>
                                    <CardContent className="pt-4">
                                        <p className="mb-4 text-lg">
                                            {question.text}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                speakQuestion(question.text)
                                            }
                                            className="mb-4"
                                        >
                                            <Volume2 className="mr-2 h-4 w-4" />
                                            Read Question
                                        </Button>
                                        <Progress
                                            value={(timeRemaining / 120) * 100}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            {/* Completion Modal */}
            {isCompleted && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <Card className="w-[400px]">
                        <CardHeader>
                            <CardTitle>Interview Completed!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                You've answered all the questions. Would you
                                like to submit your responses?
                            </p>
                            <Button
                                onClick={() => {
                                    submitInterview();
                                    navigate(-2);
                                }}
                                className="w-full"
                            >
                                <Send className="mr-2 h-4 w-4" /> Submit
                                Interview
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
