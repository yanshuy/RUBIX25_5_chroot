import { useState } from "react";
import Guidelines from "./sections/Guidelines";
import MockInterviewer from "./MockInterviewer";
import { ToastProvider } from "../../components/ui/toast";

export default function Interview() {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <div className="w-full">
            {!isStarted ? (
                <Guidelines onStart={() => setIsStarted(true)} />
            ) : (
                <ToastProvider>
                    <MockInterviewer />
                </ToastProvider>
            )}
        </div>
    );
}
