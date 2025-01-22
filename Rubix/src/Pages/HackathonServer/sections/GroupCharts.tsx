import { useState } from "react";
import { Send } from "lucide-react";

const initialChats = [
    { id: 1, name: "General", messages: [] },
    { id: 2, name: "Team Finder", messages: [] },
    { id: 3, name: "Tech Support", messages: [] },
    { id: 4, name: "Random", messages: [] },
];

export default function GroupChats() {
    const [chats, setChats] = useState(initialChats);
    const [activeChat, setActiveChat] = useState(1);
    const [message, setMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === activeChat
                        ? {
                              ...chat,
                              messages: [
                                  ...chat.messages,
                                  {
                                      id: Date.now(),
                                      text: message,
                                      sender: "You",
                                  },
                              ],
                          }
                        : chat,
                ),
            );
            setMessage("");
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-64 border-r border-gray-200 bg-gray-100 p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-700">
                    Group Chats
                </h3>
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`mb-2 w-full rounded-md p-2 text-left ${
                            activeChat === chat.id
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {chat.name}
                    </button>
                ))}
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    {chats
                        .find((chat) => chat.id === activeChat)
                        ?.messages.map((msg) => (
                            <div key={msg.id} className="mb-4">
                                <span className="font-semibold text-gray-700">
                                    {msg.sender}:{" "}
                                </span>
                                <span className="text-gray-600">
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="border-t border-gray-200 p-4"
                >
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="rounded-r-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
