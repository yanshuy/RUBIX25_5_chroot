import React, { useEffect, useState } from "react";
import {
    Search,
    TrendingUp,
    MessageSquare,
    Eye,
    Clock,
    User,
    Share2,
    ChevronUp,
    ChevronDown,
    Award,
    PlusCircle,
    Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThreadType, commentsArr, threads } from "./data";
import CreateThreadModal from "./CreateThreadModal";
import { Comment } from "./ThreadPage";
import { TbClock } from "react-icons/tb";
import { baseUrl } from "../../App";

type Category = {
    id: string;
    name: string;
    icon: string;
};

type Contributor = {
    id: string;
    name: string;
    avatar: string;
    score: number;
};

const categories: Category[] = [
    { id: "1", name: "Technology", icon: "💻" },
    { id: "2", name: "Business", icon: "💼" },
    { id: "3", name: "Healthcare", icon: "🏥" },
    { id: "4", name: "Education", icon: "🎓" },
    { id: "5", name: "Entertainment", icon: "🎭" },
];

const topContributors: Contributor[] = [
    {
        id: "1",
        name: "Devansh Nair",
        avatar: "/src/assets/Logoicon.png",
        score: 1250,
    },
    {
        id: "2",
        name: "Vaibhav Pai",
        avatar: "/src/assets/Logoicon.png",
        score: 1100,
    },
    {
        id: "3",
        name: "Vedang Kulkarni",
        avatar: "/src/assets/Logoicon.png",
        score: 950,
    },
];

function CategoryList({
    activeCategory,
    setActiveCategory,
}: {
    activeCategory: Category;
    setActiveCategory: React.Dispatch<React.SetStateAction<Category>>;
}) {
    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
                Categories
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category)}
                        className={`flex items-center justify-center rounded-lg p-3 text-sm font-medium transition-colors duration-200 ${
                            activeCategory.id === category.id
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                        }`}
                    >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Thread({ thread }: { thread: ThreadType }) {
    const [votes, setVotes] = useState(thread.upvotes - thread.downvotes);

    const handleUpvote = () => setVotes(votes + 1);
    const handleDownvote = () => setVotes(votes - 1);

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        {thread.category}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleUpvote}
                            className="text-slate-500 transition-colors duration-200 hover:text-green-600"
                        >
                            <ChevronUp className="h-5 w-5" />
                        </button>
                        <span className="font-semibold text-gray-700">
                            {votes}
                        </span>
                        <button
                            onClick={handleDownvote}
                            className="text-slate-500 transition-colors duration-200 hover:text-red-600"
                        >
                            <ChevronDown className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <Link
                    to={`/forum/thread/${thread.id}`}
                    className="mb-2 block text-xl font-bold text-slate-800 transition-colors duration-200 hover:text-blue-600"
                >
                    {thread.title}
                </Link>
                <p className="mb-4 line-clamp-2 text-slate-600">
                    {thread.content}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {thread.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <User className="-mt-px mr-1.5 h-4 w-4" />
                            {thread.author}
                        </span>
                        <span className="flex items-center">
                            <Clock className="mr-1.5 h-4 w-4" />
                            {new Date(thread.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {thread.replies}
                        </span>
                        <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {thread.views}
                        </span>
                        <button className="flex items-center transition-colors duration-200 hover:text-blue-600">
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ThreadList({ threads }: { threads: ThreadType[] }) {
    return (
        <div className="space-y-6">
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </div>
    );
}

const Sidebar: React.FC = () => (
    <div className="space-y-5">
        <div className="rounded-xl bg-white p-5 shadow-md">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Trending Topics
            </h3>
            <ul className="space-y-2 text-slate-600">
                <li className="cursor-pointer text-sm hover:text-blue-600">
                    #BusinessGrowth
                </li>
                <li className="cursor-pointer text-sm hover:text-blue-600">
                    #StartupFunding
                </li>
                <li className="cursor-pointer text-sm hover:text-blue-600">
                    #HealthTech
                </li>
            </ul>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-md">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Award className="mr-2 size-6 text-yellow-500" />
                Top Contributors
            </h3>
            <ul className="space-y-4">
                {topContributors.map((contributor) => (
                    <li
                        key={contributor.id}
                        className="flex items-center gap-2"
                    >
                        <div className="grid size-9 place-items-center rounded-full bg-blue-50">
                            {contributor.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-medium text-gray-700">
                                {contributor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {contributor.score} points
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default function Forum() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [isCreateThreadModalOpen, setIsCreateThreadModalOpen] =
        useState(false);
    const [notifications, setNotifications] = useState(1);
    const [isActivityOpen, setIsActivityOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [forumThreads, setForumThreads] = useState(threads);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/users/me/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                setName(data.fullname);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const filteredThreads = forumThreads.filter(
        (thread) => thread.category === activeCategory.name,
    );

    const userThreads = forumThreads.filter((thread) => thread.author === name);
    const userComments = commentsArr.filter(
        (comment) => comment.author === name,
    );

    const clearNotifications = () => {
        setNotifications(0);
    };

    const toggleActivity = () => {
        setIsActivityOpen(!isActivityOpen);
        setActiveSection(null);
    };

    const handleCreateThread = (newThread: ThreadType) => {
        setForumThreads([newThread, ...forumThreads]);
        setIsCreateThreadModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
                    <div className="ml-1 h-[3.2rem] cursor-pointer p-1">
                        <Link to={"/"}>
                            <img
                                src="../../src/assets/Logo.png"
                                alt="Logo"
                                className="h-[100%] scale-125 object-cover"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="relative text-gray-600 transition-colors duration-200 hover:text-blue-600"
                            onClick={clearNotifications}
                        >
                            <Bell className="h-6 w-6" />
                            {notifications > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    {notifications}
                                </span>
                            )}
                        </button>
                        <button
                            className="relative text-gray-600 transition-colors duration-200 hover:text-blue-600"
                            onClick={toggleActivity}
                        >
                            <TbClock className="size-7" />
                        </button>
                    </div>
                </div>

                {isActivityOpen && (
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-slate-800">
                            Your Activity
                        </h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setActiveSection("threads")}
                                className={`rounded-md px-4 py-2 ${
                                    activeSection === "threads"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                Threads
                            </button>
                            <button
                                onClick={() => setActiveSection("comments")}
                                className={`rounded-md px-4 py-2 ${
                                    activeSection === "comments"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                Comments
                            </button>
                            <button
                                onClick={() => setActiveSection("saved")}
                                className={`rounded-md px-4 py-2 ${
                                    activeSection === "saved"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                Saved Threads
                            </button>
                        </div>
                    </div>
                )}

                {activeSection === "threads" && (
                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-semibold text-slate-800">
                            Your Threads
                        </h3>
                        <ThreadList threads={userThreads} />
                    </div>
                )}

                {activeSection === "comments" && (
                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-semibold text-slate-800">
                            Your Comments
                        </h3>
                        <div className="space-y-4">
                            {userComments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                )}

                {!isActivityOpen && (
                    <>
                        <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
                            <div className="relative mb-4 w-full sm:mb-0 sm:w-96">
                                <input
                                    type="text"
                                    placeholder="Search forums..."
                                    className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-11 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setIsCreateThreadModalOpen(true)}
                                className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                New Thread
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="lg:w-3/4">
                                <CategoryList
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                />
                                <ThreadList threads={filteredThreads} />
                            </div>
                            <div className="lg:w-1/4">
                                <Sidebar />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <CreateThreadModal
                isOpen={isCreateThreadModalOpen}
                onClose={() => setIsCreateThreadModalOpen(false)}
                onCreateThread={handleCreateThread}
                categories={categories}
            />
            {/* <ChatbotButton /> */}
        </div>
    );
}
