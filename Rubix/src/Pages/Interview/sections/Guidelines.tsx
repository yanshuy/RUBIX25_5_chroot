import { Button } from "@/components/ui/button";

interface GuidelinesProps {
    onStart: () => void;
}

export default function Guidelines({ onStart }: GuidelinesProps) {
    return (
        <div className="grid h-screen place-items-center">
            <div className="space-y-6">
                <h1 className="text-4xl font-bold">
                    AI Online Interview Guidelines
                </h1>
                <ul className="list-inside list-disc space-y-2">
                    <li>
                        Ensure you're in a quiet environment with a stable
                        internet connection.
                    </li>
                    <li>
                        Use a good quality microphone for clear audio input.
                    </li>
                    <li>Speak clearly and at a moderate pace.</li>
                    <li>
                        The interview will consist of several questions related
                        to your skills and experience.
                    </li>
                    <li>
                        Take a moment to think before answering each question.
                    </li>
                    <li>
                        If you need a question repeated, simply say "Please
                        repeat the question."
                    </li>
                    <li>
                        The interview will last approximately 10-15 minutes.
                    </li>
                </ul>
                <Button onClick={onStart}>Start Interview</Button>
            </div>
        </div>
    );
}
