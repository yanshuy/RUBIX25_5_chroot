import { useState, useEffect } from "react";

interface NotificationProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

export default function Notification({
    message,
    duration = 3000,
    onClose,
}: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="fixed bottom-4 right-4 rounded-md bg-gray-800 px-4 py-2 text-white shadow-lg">
            {message}
        </div>
    );
}
