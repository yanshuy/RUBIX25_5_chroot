export default function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: "0.2s" }}
            ></div>
            <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: "0.4s" }}
            ></div>
        </div>
    );
}
