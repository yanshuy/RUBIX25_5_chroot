import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface QuestionReaderProps {
    text: string;
}

const QuestionReader: React.FC<QuestionReaderProps> = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(true);

    useEffect(() => {
        speak();
        return () => {
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const speak = () => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => setIsSpeaking(false);
            setIsSpeaking(true);
            window.speechSynthesis.speak(utterance);
        }
    };

    const stop = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={isSpeaking ? stop : speak}
            className="mt-2"
        >
            {isSpeaking ? (
                <VolumeX className="mr-2 h-4 w-4" />
            ) : (
                <Volume2 className="mr-2 h-4 w-4" />
            )}
            {isSpeaking ? "Stop Reading" : "Read Question"}
        </Button>
    );
};

export default QuestionReader;
